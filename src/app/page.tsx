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
      <ChipCard inputFocus={inputFocus} setInputFocus={setInputFocus} />
      <div></div>
    </main>
  )
}
