"use client";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { formatBalanceETH } from "@/app/libs/helper";
function BalanceCard({ token }) {
  const [priceETH, setPriceETH] = useState(0);

  useEffect(() => {
    const fetchPrice = async () => {
      const response = await fetch("/api/v1/price");
      const data = await response.json();
      setPriceETH(data.price.eth);
    };
    fetchPrice();
  }, []);
  const {
    iconUrl,
    name = "ETH",
    symbolETH = "ETH",
    networkType = "mainnet",
    balance,
  } = token || {};
  const account = useAccount();

  const displayIcon = iconUrl || "/icons/default.png";
  const displaySymbol = symbolETH || "$";
  const isTestnet = networkType?.toLowerCase() === "testnet";

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Ilustrasi di atas card */}

      {/* Card ETH Balance */}

      <div className="bg-gray-800/50 border border-white/10 rounded-xl px-6 pb-3 w-full text-white shadow-md backdrop-blur">
        <div className="flex justify-center mb-2">
          <div className="  rounded-xl">
            <Image
              src="/icons/pie-chart.svg"
              alt="Ilustrasi"
              width={150}
              height={100}
              style={{ height: "auto" }}
              className="object-contain text-green-400"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">ETH Balance</h3>
          <div className="text-sm">
            <span
              className={`inline-block px-3 py-1 rounded-full text-white font-medium
            ${isTestnet ? "bg-yellow-600" : "bg-green-600"}`}
            >
              {isTestnet ? "Testnet" : "Mainnet"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Image
            src={displayIcon}
            alt={name}
            width={32}
            height={32}
            className="rounded-full border border-white/20"
          />
          <span className="font-medium">{name}</span>
        </div>

        <div className="flex justify-between border-t border-white/10 pt-3 text-sm mb-2">
          <div>
            <div className="text-white/70">Balance</div>
            <div className="text-xl font-bold">
              {account.isConnected ? balance : "0"} {displaySymbol}
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/70">USD</div>
            <div className="text-xl font-bold">
              $
              {symbolETH.toLowerCase() === "eth"
                ? formatBalanceETH(balance * priceETH)
                : "0"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
