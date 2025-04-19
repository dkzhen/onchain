import fs from "fs/promises";
import path from "path";

const COINGECKO_API_URL = `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR`;

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
    // Cek apakah cache masih berlaku
    try {
      const fileContent = await fs.readFile(CACHE_FILE, "utf-8");
      const cached = JSON.parse(fileContent);

      const now = Date.now();
      if (now - cached.timestamp < CACHE_DURATION) {
        return { ethereum: { usd: cached.price } };
      }
    } catch {
      // Cache tidak ditemukan atau tidak bisa dibaca, lanjut fetch
    }

    // Fetch data baru dari API
    const response = await fetch(COINGECKO_API_URL);
    const data = await response.json();

    if (!data.USD) {
      throw new Error("Invalid API response: USD not found");
    }

    const result = {
      price: data.USD,
      timestamp: Date.now(),
    };

    // Simpan ke cache
    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
    await fs.writeFile(CACHE_FILE, JSON.stringify(result, null, 2), "utf-8");

    return { ethereum: { usd: result.price } };
  } catch (error) {
    console.error("getPriceETH error:", error);
    throw error;
  }
}
