"use client";

export async function switchToCustomChain(network) {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask is not available");
  }

  const provider = window.ethereum;
  const chainIdHex = "0x" + Number(network.id).toString(16);

  try {
    // Coba switch dulu (kalau sudah pernah ditambahkan)
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    });
  } catch (switchError) {
    // Kalau belum ditambahkan, tambahkan dulu
    if (switchError.code === 4902) {
      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainIdHex,
              chainName: network.name,
              nativeCurrency: {
                name: network.nativeCurrency?.name || "ETH",
                symbol: network.nativeCurrency?.symbol || "ETH",
                decimals: 18,
              },
              rpcUrls: [network.rpcUrl],
              blockExplorerUrls: [network.explorer || "https://example.com"],
            },
          ],
        });

        // Setelah ditambahkan, coba switch lagi
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIdHex }],
        });
      } catch (addError) {
        console.error("Failed to add custom chain:", addError);
        throw addError;
      }
    } else {
      console.error("Switch error:", switchError);
      throw switchError;
    }
  }
}
