import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="bg-fixed bg-center bg-cover custom-img h-screen text-white">
      <Navbar/>
      <div className="flex flex-col items-center gap-20 pt-40">
        <h1 className="text-4xl sm:text-6xl font-bold text-center">
          Connecting Bookworms Worldwide.
        </h1>
        <button className="bg-green-600 rounded-3xl hover:bg-green-700">
        <Link href="/signup">
          <h2 className="p-4 text-center tracking-wider">
            Join For Free
          </h2>
        </Link>
        </button>
      </div>
    </div>
  )
}
