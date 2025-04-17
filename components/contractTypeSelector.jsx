"use client";

import { useState } from "react";
import {
  CheckCircle,
  Copy,
  FileCode2,
  Github,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { ERC20_ABI, ERC20_BYTECODE } from "@/app/libs/contract";

const options = [
  {
    value: "erc20",
    label: "Deploy ERC-20 Token",
    description: "Standard fungible token",
    gradient: "from-purple-500 to-pink-500",
    emoji: "🪙",
    verified: true,
    openSource: true,
    bytecode: ERC20_BYTECODE,
    abi: ERC20_ABI,
    links: {
      github: "https://github.com/dkzhen/onchain",
      sol: "https://raw.githubusercontent.com/dkzhen/onchain/refs/heads/main/public/contracts/ERC20.sol",
    },
  },
  {
    value: "nft",
    label: "Deploy NFT (ERC-721)",
    description: "Non-fungible token (NFT)",
    gradient: "from-yellow-400 to-red-500",
    emoji: "🖼️",
    verified: true,
    openSource: true,
    comingSoon: true,
    bytecode: "0x6001600102...",
    abi: `[{"type": "function", "name": "mint", ... }]`,
    links: {
      github: "https://github.com/example/nft",
      sol: "https://raw.githubusercontent.com/example/nft/NFT.sol",
    },
  },
  {
    value: "custom",
    label: "Deploy Custom Contract",
    description: "Write and deploy your own",
    gradient: "from-blue-500 to-cyan-500",
    emoji: "⚙️",
    verified: false,
    openSource: false,
    comingSoon: true,
  },
];

export default function ContractTypeSelector({
  selectedOption,
  setSelectedOption,
}) {
  const [copied, setCopied] = useState("");

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-4 text-gray-200">Select Tools</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((option) => {
          const isSelected = selectedOption === option.value;
          const isDisabled = option.comingSoon;

          return (
            <div
              key={option.value}
              className={`group relative p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between text-left shadow-md ${
                isSelected
                  ? "border-blue-500 bg-blue-900/20"
                  : isDisabled
                  ? "border-gray-700 bg-gray-700/30 cursor-not-allowed opacity-50"
                  : "border-gray-700 bg-gray-800/40 hover:border-gray-600 cursor-pointer"
              }`}
              onClick={() => {
                if (!isDisabled) {
                  setSelectedOption(isSelected ? null : option.value);
                }
              }}
            >
              <div className="text-left w-full flex flex-col items-start">
                <div
                  className={`w-12 h-12 mb-3 rounded-full bg-gradient-to-r ${option.gradient} flex items-center justify-center text-2xl`}
                >
                  {option.emoji}
                </div>
                <h4 className="font-semibold text-white text-base flex items-center gap-1">
                  {option.label}
                  {option.verified && (
                    <ShieldCheck className="text-green-400 w-4 h-4" />
                  )}
                  {option.comingSoon && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-300 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Coming Soon
                    </span>
                  )}
                </h4>
                <p className="text-sm text-gray-400 mb-2">
                  {option.description}
                </p>
              </div>

              {isSelected && !option.comingSoon && (
                <div className="mt-2 border-t border-gray-700 pt-3 space-y-2 text-sm">
                  {option.openSource && (
                    <div className="text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Open Source
                    </div>
                  )}

                  <div className="flex items-center gap-2 flex-wrap">
                    {option.links?.github && (
                      <a
                        href={option.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-400 hover:underline text-xs"
                      >
                        <Github className="w-4 h-4" />
                        GitHub Repo
                      </a>
                    )}
                    {option.links?.sol && (
                      <a
                        href={option.links.sol}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-yellow-400 hover:underline text-xs"
                      >
                        <FileCode2 className="w-4 h-4" />
                        .sol File
                      </a>
                    )}
                  </div>

                  {option.bytecode && (
                    <div className="bg-gray-900 rounded-md px-3 py-2 text-xs font-mono flex justify-between items-center">
                      <span className="truncate max-w-[80%]">Bytecode</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(option.bytecode, "bytecode");
                        }}
                        className="ml-2 text-gray-400 hover:text-white cursor-pointer"
                      >
                        {copied === "bytecode" ? (
                          <CheckCircle className="w-4 h-4 text-green-400 transition-all duration-300" />
                        ) : (
                          <Copy className="w-4 h-4 transition-all duration-300" />
                        )}
                      </button>
                    </div>
                  )}

                  {option.abi && (
                    <div className="bg-gray-900 rounded-md px-3 py-2 text-xs font-mono flex justify-between items-center">
                      <span className="truncate max-w-[80%]">ABI JSON</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(option.abi, "abi");
                        }}
                        className="ml-2 text-gray-400 hover:text-white cursor-pointer"
                      >
                        {copied === "abi" ? (
                          <CheckCircle className="w-4 h-4 text-green-400 transition-all duration-300" />
                        ) : (
                          <Copy className="w-4 h-4 transition-all duration-300" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {isSelected && !option.comingSoon && (
                <CheckCircle className="absolute top-3 right-3 text-blue-400 w-5 h-5" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
