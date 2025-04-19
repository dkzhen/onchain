import fs from "fs/promises";
import path from "path";

const API_URL = `https://ethapi.openocean.finance/v2/1/quote?quoteType=swap&inTokenSymbol=ETH&inTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&outTokenSymbol=BAD&outTokenAddress=0x32b86b99441480a7e5bd3a26c124ec2373e3f015&amountAll=1&amount=1000000000000000000&gasPrice=5000000000&slippage=100&referrer=0x3487ef9f9b36547e43268b8f0e2349a226c70b53&disabledDexIds=`; // Ganti dengan URL asli kamu

const CACHE_FILE = path.join(
  process.cwd(),
  "app",
  "api",
  "repo",
  "eth_price.json"
);

const CACHE_DURATION = 10 * 60 * 1000; // 10 menit

export async function getPriceETH() {
  try {
    // Cek cache
    try {
      const fileContent = await fs.readFile(CACHE_FILE, "utf-8");
      const cached = JSON.parse(fileContent);

      const now = Date.now();
      if (now - cached.timestamp < CACHE_DURATION) {
        return { ethereum: { usd: cached.price } };
      }
    } catch {
      // Cache error / tidak ada file → lanjut fetch
    }

    // Fetch dari API baru
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!data.inToken || typeof data.inToken.price !== "number") {
      throw new Error("Invalid API response");
    }

    const ethPrice = data.inToken.price;

    const result = {
      price: ethPrice,
      timestamp: Date.now(),
    };

    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
    await fs.writeFile(CACHE_FILE, JSON.stringify(result, null, 2), "utf-8");

    return { ethereum: { usd: ethPrice } };
  } catch (error) {
    console.error("getPriceETH error:", error);

    // Fallback ke cache jika tersedia
    try {
      const fileContent = await fs.readFile(CACHE_FILE, "utf-8");
      const cached = JSON.parse(fileContent);
      console.warn("Using cached data due to error.");
      return { ethereum: { usd: cached.price } };
    } catch (cacheError) {
      console.error("Cache read failed:", cacheError);
      throw error;
    }
  }
}
