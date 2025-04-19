"use client";

import { useEffect, useState } from "react";
import { useNetworkStore } from "@/app/store/zustand";
import { useSwitchChain } from "wagmi";
import { switchToCustomChain } from "@/app/libs/switcher";
import { ethers } from "ethers";
import { ERC20_ABI, ERC20_BYTECODE } from "@/app/libs/contract";
import { toastError, toastSuccess, toastWarn } from "@/app/libs/toast";

export default function CreateContractCard() {
  const { allNetworks, activeNetwork } = useNetworkStore();
  const { chains, switchChain } = useSwitchChain();

  const [realChainId, setRealChainId] = useState(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [tokenSupply, setTokenSupply] = useState("1000000");

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

  const handleClick = async () => {
    const selected = allNetworks.find((n) => n.id === activeNetwork);
    if (!selected) {
      toastWarn("No network selected");
      console.warn("No network selected");
      return;
    }

    const selectedId = Number(selected.id);
    if (realChainId === selectedId) {
      await createERC20Contract();
      return;
    }

    setIsSwitching(true);
    try {
      const knownChain = chains.find((c) => c.id === selectedId);
      if (knownChain) {
        switchChain({ chainId: knownChain.id });
      } else {
        await switchToCustomChain(selected);
      }
    } catch (err) {
      console.error("Failed to switch:", err);
    } finally {
      setIsSwitching(false);
    }
  };

  const createERC20Contract = async () => {
    if (!tokenName || !tokenSymbol) {
      toastWarn("Token name and symbol are required");
      console.warn("Token name and symbol are required");
      return;
    }

    try {
      setIsDeploying(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const factory = new ethers.ContractFactory(
        ERC20_ABI,
        ERC20_BYTECODE,
        signer
      );
      const totalSupply = ethers.utils.parseUnits(tokenSupply, tokenDecimals);
      const contract = await factory.deploy(
        tokenName,
        tokenSymbol,
        tokenDecimals,
        totalSupply
      );

      await contract.deployed();

      toastSuccess(`Contract deployed..`);
    } catch (error) {
      toastError("Error deploying contract");
      console.error("Error deploying contract:", error);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="mt-6 border border-gray-700 bg-gray-800/50 p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-4">
        Deploy ERC-20 Contract
      </h3>
      {!allNetworks.find((n) => n.id === activeNetwork) && (
        <div className="bg-yellow-500/10 border border-yellow-600 text-yellow-300 rounded-lg p-4 mb-6 text-sm">
          ⚠️ Please select a network before proceeding. ETH sending is disabled
          until a network is active.
        </div>
      )}
      {/* Responsive 2-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="tokenName" className="block text-white">
            Token Name
          </label>
          <input
            id="tokenName"
            type="text"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className="mt-2 p-2 w-full rounded bg-gray-700 text-white"
            placeholder="Enter token name"
          />
        </div>

        <div>
          <label htmlFor="tokenSymbol" className="block text-white">
            Token Symbol
          </label>
          <input
            id="tokenSymbol"
            type="text"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            className="mt-2 p-2 w-full rounded bg-gray-700 text-white"
            placeholder="Enter token symbol"
          />
        </div>

        <div>
          <label htmlFor="tokenDecimals" className="block text-white">
            Decimals
          </label>
          <input
            id="tokenDecimals"
            type="number"
            value={tokenDecimals}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1) setTokenDecimals(value);
            }}
            min="0"
            className="mt-2 p-2 w-full rounded bg-gray-700 text-white"
            placeholder="Enter decimals (default: 18)"
            style={{
              appearance: "textfield", // untuk Edge
              MozAppearance: "textfield", // untuk Firefox
              WebkitAppearance: "none", // untuk Chrome/Safari
            }}
          />
        </div>

        <div>
          <label htmlFor="tokenSupply" className="block text-white">
            Total Supply
          </label>
          <input
            id="tokenSupply"
            type="number"
            value={tokenSupply}
            onChange={(e) => {
              setTokenSupply(e.target.value);
              if (value >= 1) setTokenSupply(value);
            }}
            className="mt-2 p-2 w-full rounded bg-gray-700 text-white"
            placeholder="Total supply"
          />
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={isSwitching || isDeploying}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white cursor-pointer px-6 py-2 rounded-lg transition"
      >
        {isSwitching || isDeploying ? "Processing..." : "Create Contract"}
      </button>
    </div>
  );
}
