'use client';
import ChipCard from "@/components/ChipCard";
import { useState } from "react";

export default function Home() {
  const [inputFocus, setInputFocus] = useState<boolean>(false)
  return (
    <main
      className="w-Screen overflow-x-hidden h-auto min-h-screen overflow-y-auto flex flex-col justify-around items-center bg-gray-100"
      onClick={() => setInputFocus(false)}
    >
      <div className="w-4/5 flex flex-col items-center gap-5">

        <h1 className="text-2xl md:text-4xl text-blue-500 font-bold">Pick User</h1>
        <ChipCard inputFocus={inputFocus} setInputFocus={setInputFocus} />
      </div>
      <div></div>
    </main>
  )
}
