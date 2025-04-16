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
  const [errors, setErrors] = useState({});
  const handleAdd = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Network Name is required";
    if (!id.trim()) newErrors.id = "Chain ID is required";
    if (!rpcUrl.trim()) newErrors.rpcUrl = "RPC URL is required";

    setErrors(newErrors); // <- ini update UI-nya

    // Kalau ada error, jangan lanjut
    if (Object.keys(newErrors).length > 0) return;

    // Kalau valid, lanjut tambah network
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
    setErrors({}); // reset error juga biar bersih
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
            className={`p-2 rounded w-full bg-gray-800 border text-white ${
              errors.name ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="Network Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: undefined }));
              }
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
          <input
            className={`p-2 rounded w-full bg-gray-800 border text-white ${
              errors.name ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="Chain ID"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              if (errors.id) {
                setErrors((prev) => ({ ...prev, id: undefined }));
              }
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
          <input
            className={`p-2 rounded w-full bg-gray-800 border text-white ${
              errors.name ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="RPC URL"
            value={rpcUrl}
            onChange={(e) => {
              setRpcUrl(e.target.value);
              if (errors.rpcUrl) {
                setErrors((prev) => ({ ...prev, rpcUrl: undefined }));
              }
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
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
