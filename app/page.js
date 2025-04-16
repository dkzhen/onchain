import AvailableNetworks from "@/components/availableNetwork";
import CreateContractCard from "@/components/createContract";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white ">
      <div className="container py-6 px-4 mx-auto">
        <Navbar />
        <AvailableNetworks />
        <CreateContractCard />
      </div>
    </div>
  );
}
