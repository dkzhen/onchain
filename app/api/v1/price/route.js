import { NextResponse } from "next/server";
import { getPriceETH } from "../../repo/ethPrice";

export async function GET() {
  try {
    const ethPrice = await getPriceETH(); // ambil data harga ETH
    return NextResponse.json({
      price: {
        eth: ethPrice.ethereum.usd, // kirim data dalam format JSON
      },
    });
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    return NextResponse.json(
      { error: "Failed to fetch ETH price" },
      { status: 500 }
    );
  }
}
