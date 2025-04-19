"use client";
import { useEffect } from "react";
import { Trash2, MoreHorizontal, Plus, X } from "lucide-react";
import { useNetworkStore } from "@/app/store/zustand";
import AddNetworkModal from "./addNetwork";
import Image from "next/image";

export default function AvailableNetworks() {
  const {
    allNetworks,
    activeNetwork,
    showMore,
    removeNetwork,
    setActiveNetwork,
    setShowMore,
    toggleModal,
    hydrateNetworks,
  } = useNetworkStore();

  const maxVisible = 5;

  useEffect(() => {
    hydrateNetworks();
  }, []);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-gray-700">
        <div>
          <h2 className="text-xl font-semibold text-blue-400">
            Available Networks
          </h2>
          <p className="text-sm text-gray-400">
            Select a network to use for smart contract deployment
          </p>
        </div>

        <button
          onClick={toggleModal}
          className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition cursor-pointer w-full sm:w-auto"
        >
          + Add Network
        </button>

        <AddNetworkModal />
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 pb-6">
        {/* Selected Network Info */}
        {activeNetwork && (
          <div className="mt-4 mb-2 text-sm text-blue-400">
            Selected Network:{" "}
            <span className="font-semibold text-white">
              {allNetworks.find((n) => n.id === activeNetwork)?.name}
            </span>{" "}
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm
          ${
            allNetworks.find((n) => n.id === activeNetwork)?.isTestnet
              ? "bg-gradient-to-r from-yellow-500 to-yellow-700 text-yellow-50"
              : "bg-gradient-to-r from-green-500 to-green-700 text-green-50"
          }`}
            >
              {allNetworks.find((n) => n.id === activeNetwork)?.isTestnet
                ? "Testnet"
                : "Mainnet"}
            </span>
          </div>
        )}

        {/* Network Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
          {allNetworks
            .sort((a, b) => (b.isCustom ? 1 : 0) - (a.isCustom ? 1 : 0)) // Prioritize custom networks
            .slice(0, maxVisible)
            .map((network) => (
              <div
                key={network.id}
                className={`relative p-3 text-sm rounded-lg border transition-all flex flex-col items-center justify-center gap-2 ${
                  activeNetwork === network.id
                    ? "border-blue-500 bg-blue-900/20"
                    : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                }`}
              >
                {network.isCustom && (
                  <button
                    className="absolute top-1 right-1 cursor-pointer text-red-400 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNetwork(network.id);
                    }}
                    title="Remove Network"
                  >
                    <Trash2 className="w-4 h-4 mr-[4px] mt-[4px]" />
                  </button>
                )}

                <button
                  className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                  onClick={() => setActiveNetwork(network.id)}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-slate-50 p-[2px]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                      <Image
                        src={network.icon}
                        alt={network.name}
                        className="w-full h-full object-cover rounded-full"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>

                  <span className="text-white text-xs font-medium truncate">
                    {network.name}
                  </span>
                  <span
                    className={`text-[10px] mt-1 px-2 py-0.5 rounded-full font-bold shadow-sm ${
                      network.isTestnet
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-700 text-yellow-50"
                        : "bg-gradient-to-r from-green-500 to-green-700 text-green-50"
                    }`}
                  >
                    {network.isTestnet ? "Testnet" : "Mainnet"}
                  </span>
                </button>
              </div>
            ))}

          {/* Show More Button */}
          {allNetworks.length > maxVisible && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="z-10 p-3 text-sm rounded-lg cursor-pointer border border-gray-700 bg-gray-800/50 hover:border-gray-600 flex flex-col items-center justify-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <MoreHorizontal className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-xs">
                {showMore ? "Hide" : "More"}
              </span>
            </button>
          )}
        </div>

        {/* More Networks */}
        {showMore && (
          <div className="mt-6 p-4 rounded-xl bg-gray-800/60 border border-gray-700 shadow-inner">
            <h3 className="text-blue-400 font-medium text-sm mb-3">
              More Networks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {allNetworks.slice(maxVisible).map((network) => (
                <div
                  key={network.id}
                  className={`relative p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition ${
                    activeNetwork === network.id
                      ? "border-blue-500 bg-blue-900/20"
                      : "border-gray-700 bg-gray-800/40 hover:border-gray-600"
                  }`}
                  onClick={() => {
                    setActiveNetwork(network.id);
                    setShowMore(false);
                  }}
                >
                  {network.isCustom && (
                    <button
                      className="absolute top-1 cursor-pointer right-1 text-red-400 hover:text-red-600 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNetwork(network.id);
                      }}
                      title="Remove Network"
                    >
                      <Trash2 className="w-4 h-4 mr-[4px] mt-[4px]" />
                    </button>
                  )}

                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-slate-50 p-[2px]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                      <Image
                        src={network.icon}
                        alt={network.name}
                        className="w-full h-full object-cover rounded-full"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>

                  <div className="flex-1 text-sm text-white">
                    <p className="font-medium">{network.name}</p>
                    <p className="text-xs text-gray-400">
                      Chain ID: {network.id}
                    </p>
                    <span
                      className={`text-[10px] mt-1 inline-block px-2 py-0.5 rounded-full font-bold shadow-sm ${
                        network.isTestnet
                          ? "bg-gradient-to-r from-yellow-500 to-yellow-700 text-yellow-50"
                          : "bg-gradient-to-r from-green-500 to-green-700 text-green-50"
                      }`}
                    >
                      {network.isTestnet ? "Testnet" : "Mainnet"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
