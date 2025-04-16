"use client";

import { useEffect, useState } from "react";
import { useNetworkStore } from "@/app/store/zustand";
import { useSwitchChain } from "wagmi";
import { switchToCustomChain } from "@/app/libs/switcher";
import { ethers } from "ethers";
import { ERC20_ABI, ERC20_BYTECODE } from "@/app/libs/contract";

export default function CreateContractCard() {
  const { allNetworks, activeNetwork } = useNetworkStore();
  const { chains, switchChain } = useSwitchChain();

  const [realChainId, setRealChainId] = useState(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  // Input state
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(18); // Default 18 decimals
  const [tokenSupply, setTokenSupply] = useState("1000000"); // Default 18 decimals

  // Sync real chainId from wallet to fix Wagmi cache issue
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

  // Fungsi untuk handle klik dan membuat kontrak ERC-20
  const handleClick = async () => {
    const selected = allNetworks.find((n) => n.id === activeNetwork);
    if (!selected) {
      console.warn("No network selected");
      return;
    }

    const selectedId = Number(selected.id);
    if (realChainId === selectedId) {
      console.log("Already on correct network");
      console.log("Creating contract...");
      await createERC20Contract();
      return;
    }

    setIsSwitching(true);
    try {
      const knownChain = chains.find((c) => c.id === selectedId);
      if (knownChain) {
        await switchChain({ chainId: knownChain.id });
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
      console.warn("Token name and symbol are required");
      return;
    }

    try {
      setIsDeploying(true);

      // Inisialisasi provider dan signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Membuat factory ERC-20 contract dengan ABI dan signer
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

      console.log("Deploying ERC20 contract...");
      await contract.deployed();
      console.log(`Contract deployed at: ${contract.address}`);
    } catch (error) {
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

      {/* Form input untuk Nama, Simbol, dan Desimal */}
      <div className="mb-4">
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

      <div className="mb-4">
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

      <div className="mb-4">
        <label htmlFor="tokenDecimals" className="block text-white">
          Decimals
        </label>
        <input
          id="tokenDecimals"
          type="number"
          value={tokenDecimals}
          onChange={(e) => setTokenDecimals(e.target.value)}
          className="mt-2 p-2 w-full rounded bg-gray-700 text-white"
          placeholder="Enter decimals (default: 18)"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tokenSupply" className="block text-white">
          Total Supply
        </label>
        <input
          id="tokenSupply"
          type="number"
          value={tokenSupply}
          onChange={(e) => setTokenSupply(e.target.value)}
          className="mt-2 p-2 w-full rounded bg-gray-700 text-white"
          placeholder="Enter decimals (default: 18)"
        />
      </div>

      {/* Tombol untuk memulai deployment */}
      <button
        onClick={handleClick}
        disabled={isSwitching || isDeploying}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white cursor-pointer px-6 py-2 rounded-lg transition"
      >
        {isSwitching || isDeploying ? "Processing..." : "Create Contract"}
      </button>
    </div>
  );
}
