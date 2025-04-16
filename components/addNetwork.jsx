import { useState } from "react";
import { useNetworkStore } from "@/app/store/zustand";

export default function AddNetworkModal() {
  const { showModal, toggleModal, addNetwork } = useNetworkStore();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [rpcUrl, setRpcUrl] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [explorerUrl, setExplorerUrl] = useState("");
  const [isTestnet, setIsTestnet] = useState(true);

  const handleAdd = () => {
    if (!name || !id || !rpcUrl)
      return alert("Please fill out all required fields");

    addNetwork({
      name,
      id,
      icon: iconUrl || "https://owlto.finance/icon/token/Ethereum.png",
      isTestnet,
      rpcUrl,
      explorerUrl,
      isCustom: true,
    });

    // Reset form
    setName("");
    setId("");
    setRpcUrl("");
    setIconUrl("");
    setExplorerUrl("");
    setIsTestnet(true);
    toggleModal();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg text-white font-semibold mb-4">
          Add Custom Network
        </h2>

        <div className="flex flex-col gap-4">
          <input
            className="p-2 rounded bg-gray-800 border border-gray-600 text-white"
            placeholder="Network Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="p-2 rounded bg-gray-800 border border-gray-600 text-white"
            placeholder="Chain ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            className="p-2 rounded bg-gray-800 border border-gray-600 text-white"
            placeholder="RPC URL"
            value={rpcUrl}
            onChange={(e) => setRpcUrl(e.target.value)}
          />
          <input
            className="p-2 rounded bg-gray-800 border border-gray-600 text-white"
            placeholder="Icon URL (optional)"
            value={iconUrl}
            onChange={(e) => setIconUrl(e.target.value)}
          />
          <input
            className="p-2 rounded bg-gray-800 border border-gray-600 text-white"
            placeholder="Block Explorer URL (optional)"
            value={explorerUrl}
            onChange={(e) => setExplorerUrl(e.target.value)}
          />

          <select
            className="p-2 rounded bg-gray-800 border border-gray-600 text-white"
            value={isTestnet ? "testnet" : "mainnet"}
            onChange={(e) => setIsTestnet(e.target.value === "testnet")}
          >
            <option value="testnet">Testnet</option>
            <option value="mainnet">Mainnet</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={toggleModal}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer"
          >
            Add Network
          </button>
        </div>
      </div>
    </div>
  );
}
