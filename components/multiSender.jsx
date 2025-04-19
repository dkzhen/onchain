import React, { useEffect, useState } from "react";
import { useNetworkStore } from "@/app/store/zustand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BalanceCard from "./partials/balanceCard";
import {
  useAccount,
  useBalance,
  useSendTransaction,
  useSwitchChain,
} from "wagmi";
import Image from "next/image";
import {
  formatBalanceETH,
  isValidEvmAddress,
  randomAddress,
} from "@/app/libs/helper";
import { toastError, toastSuccess, toastWarn } from "@/app/libs/toast";
import { parseEther } from "viem";
import { switchToCustomChain } from "@/app/libs/switcher";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const MultiSenderETH = () => {
  const [balance, setBalance] = useState("0");
  const { allNetworks, activeNetwork } = useNetworkStore();
  const selectedNetwork = allNetworks.find((n) => n.id === activeNetwork);
  const [amountSingle, setAmountSingle] = useState(0);
  const [addressRecipient, setAddressRecipient] = useState("");
  const [realChainId, setRealChainId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Untuk kontrol spinner
  const [isSwitching, setIsSwitching] = useState(false); // Untuk kontrol network switching state

  const account = useAccount();
  const {
    isSuccess,
    data: txData,
    sendTransaction,
    status,
  } = useSendTransaction();

  useEffect(() => {
    if (isSuccess) {
      toastSuccess(`Transaction sent!`);
      setIsLoading(false);
    } else if (status === "error") {
      toastError("Transaction failed");
      setIsLoading(false);
    }
  }, [isSuccess, status, txData]);

  const { chains, switchChain } = useSwitchChain();

  // Menggunakan selectedNetwork.id yang terupdate
  const { data } = useBalance({
    address: account.address,
    chainId: selectedNetwork?.id, // Pastikan chainId sesuai dengan selectedNetwork
    blockTag: "latest",
  });

  useEffect(() => {
    if (data?.formatted) {
      setBalance(formatBalanceETH(data.formatted));
    }
  }, [data]);
  useEffect(() => {
    const getChainId = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        const chainIdHex = await window.ethereum.request({
          method: "eth_chainId",
        });
        setRealChainId(parseInt(chainIdHex, 16));
      }
    };

    getChainId();

    const handleChainChange = (chainIdHex) => {
      setRealChainId(parseInt(chainIdHex, 16));
    };

    window.ethereum?.on("chainChanged", handleChainChange);
    return () =>
      window.ethereum?.removeListener("chainChanged", handleChainChange);
  }, []);

  const [recipients, setRecipients] = React.useState([
    { address: "", amount: "" },
  ]);
  const [isSending, setIsSending] = React.useState(false);

  const removeRecipient = (index) => {
    const updated = [...recipients];
    updated.splice(index, 1);
    setRecipients(updated);
  };

  const updateRecipient = (index, field, value) => {
    const updated = [...recipients];
    updated[index][field] = value;
    setRecipients(updated);
  };

  const handleSend = async () => {
    if (!isValidEvmAddress(addressRecipient)) {
      toastWarn("Invalid Ethereum address");
      return;
    }

    if (Number(amountSingle) > Number(balance)) {
      toastWarn("Insufficient balance");
      return;
    }

    setIsLoading(true);

    try {
      if (realChainId !== activeNetwork) {
        setIsSwitching(true);
        const id = toast.loading("Switching network...");

        const knownChain = chains.find((c) => c.id === activeNetwork);
        if (knownChain) {
          await switchChain({ chainId: knownChain.id });
        } else {
          await switchToCustomChain(selectedNetwork);
        }

        toast.update(id, {
          render: "Switched successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        // Tunggu sampai wallet betul-betul update ke network baru
        const waitUntilChainChanged = () =>
          new Promise((resolve) => {
            const checkChain = async () => {
              const chainIdHex = await window.ethereum.request({
                method: "eth_chainId",
              });
              const current = parseInt(chainIdHex, 16);
              if (current === activeNetwork) {
                resolve(true);
              } else {
                setTimeout(checkChain, 500);
              }
            };
            checkChain();
          });

        await waitUntilChainChanged();
        setIsSwitching(false);
      }

      // Kirim transaksi setelah jaringan sesuai
      sendTransaction({
        to: addressRecipient,
        value: parseEther(amountSingle.toString()),
      });
    } catch (err) {
      console.error(err);
      toastError("Transaction failed");
      setIsLoading(false);
      setIsSwitching(false);
    }
  };

  return (
    <div className="bg-gray-800/50 border border-white/10 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">
          Multisender ETH
        </h3>
        {!selectedNetwork ||
          (!account.isConnected && (
            <div className="bg-yellow-500/10 border border-yellow-600 text-yellow-300 rounded-lg p-4 mb-6 text-sm">
              ⚠️ Please connect your wallet or select a network before
              proceeding. ETH sending is disabled until a network is active.
            </div>
          ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Balance Card */}
          <BalanceCard
            token={{
              iconUrl: selectedNetwork?.iconUrl,
              name: selectedNetwork?.nativeCurrency?.name || "Ethereum",
              networkType: selectedNetwork?.isTestnet ? "testnet" : "mainnet",
              symbolETH: selectedNetwork?.nativeCurrency?.symbol || "ETH",
              balance,
            }}
          />

          {/* Single Send Form */}
          <div
            className={`rounded-2xl px-6 pt-6 space-y-4 border shadow-md ${
              selectedNetwork
                ? "border-gray-700 bg-gray-900/50"
                : "border-gray-800 bg-gray-800/30 opacity-50 pointer-events-none"
            } transition-all duration-200`}
          >
            <div className="text-white font-semibold text-lg flex items-center">
              <Image
                src="/icons/default.png"
                alt="Ethereum Logo"
                className="h-6 w-6 mr-2"
                width={30}
                height={30}
              />{" "}
              Send ETH
            </div>

            <div className="flex items-center border border-gray-600 rounded-md p-2">
              <Image
                src="/icons/user.png"
                alt="ENS Icon"
                className="h-5 w-5 mr-2"
                width={25}
                height={25}
              />
              <Input
                type="text"
                placeholder="Recipient address"
                value={addressRecipient}
                onChange={(e) => setAddressRecipient(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
              <Button
                variant={"outline"}
                onClick={() => setAddressRecipient(randomAddress())}
                className="ml-2 p-2 bg-transparent cursor-pointer font-semibold rounded-md transition-colors duration-200"
              >
                <Image
                  src="/icons/dice.png" // Ganti dengan path ikon acak yang Anda inginkan
                  alt="Random Icon"
                  className="h-5 w-5"
                  width={25}
                  height={25}
                />
              </Button>
            </div>

            <div className="flex items-center border border-gray-600 rounded-md p-2">
              <Image
                src={selectedNetwork?.iconUrl || "/icons/default.png"}
                alt="ETH Icon"
                className="h-5 w-5 mr-2 rounded-full"
                width={25}
                height={25}
              />
              <Input
                type="number"
                placeholder={`Amount (${
                  selectedNetwork?.nativeCurrency?.symbol || "ETH"
                })`}
                min="0"
                step="any"
                value={amountSingle}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  if (value === "" || parseFloat(value) >= 0) {
                    setAmountSingle(value);
                  }
                }}
                style={{
                  appearance: "textfield",
                  MozAppearance: "textfield",
                  WebkitAppearance: "none",
                  margin: 0,
                }}
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                variant={"outline"}
                className=" bg-transparent cursor-pointer font-semibold rounded-md transition-colors duration-200"
                onClick={() => setAmountSingle(Number(0.01))}
              >
                0.01
              </Button>
              <Button
                variant={"outline"}
                className=" bg-transparent cursor-pointer font-semibold rounded-md transition-colors duration-200"
                onClick={() => {
                  setAmountSingle(Number(balance * 0.25).toFixed(2));
                }}
              >
                25%
              </Button>
              <Button
                variant={"outline"}
                className=" bg-transparent cursor-pointer font-semibold rounded-md transition-colors duration-200"
                onClick={() => {
                  const newAmount = Number(balance * 0.95).toFixed(2);
                  setAmountSingle(newAmount > 0 ? newAmount : 0);
                }}
              >
                MAX
              </Button>
            </div>

            <Button
              onClick={() => {
                if (!isLoading && !isSwitching) handleSend();
              }}
              disabled={
                isLoading ||
                isSwitching ||
                !selectedNetwork ||
                !account.isConnected
              }
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200 flex items-center justify-center mb-4 md:mb-0"
            >
              {isLoading || isSwitching ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {isLoading ? "Sending..." : "Switching Network..."}
                  </span>
                </div>
              ) : (
                "Send"
              )}
            </Button>
          </div>
        </div>

        {/* Multi Send Section */}
        <div className="border-t border-gray-700 pt-6">
          <fieldset
            disabled={!selectedNetwork}
            className={!selectedNetwork ? "opacity-50 pointer-events-none" : ""}
          >
            <div className="flex justify-between items-center mb-4">
              {/* <h4 className="text-white text-lg font-semibold">
                Multi Address Sender
              </h4> */}
              <div className="flex gap-2">
                <Button
                  disabled
                  variant="secondary"
                  onClick={() =>
                    setRecipients([...recipients, { address: "", amount: "" }])
                  }
                >
                  + Add Address
                </Button>
                <Button
                  variant="primary"
                  disabled
                  onClick={() => {
                    const randomAddress =
                      "0x" + crypto.randomUUID().replace(/-/g, "").slice(0, 40);
                    setRecipients([
                      ...recipients,
                      { address: randomAddress, amount: "0.01" },
                    ]);
                  }}
                >
                  🎲 Random
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {recipients.slice(1).map((recipient, index) => (
                <div
                  key={index + 1}
                  className="flex flex-col md:flex-row gap-2 items-center"
                >
                  <Input
                    type="text"
                    placeholder="Recipient address"
                    value={recipient.address}
                    onChange={(e) =>
                      updateRecipient(index + 1, "address", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Amount (ETH)"
                    value={recipient.amount}
                    onChange={(e) =>
                      updateRecipient(index + 1, "amount", e.target.value)
                    }
                    className="w-32"
                  />
                  <Button
                    variant="destructive"
                    onClick={() => removeRecipient(index + 1)}
                  >
                    🗑 Remove
                  </Button>
                </div>
              ))}
            </div>

            {recipients.length > 1 && (
              <div className="mt-6">
                <Button
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200"
                  onClick={handleSend}
                  disabled={isSending || !selectedNetwork}
                >
                  {isSending ? "Sending..." : "Send to All"}
                </Button>
              </div>
            )}
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default MultiSenderETH;
