import Navbar from "@/components/menu";
import Start from "@/components/start";

export default function Home() {
  return (
    <div className=" bg-white">
      <Navbar />

      {/* Start Page for Starting the Game */}
      <Start />
    </div>
  );
}
