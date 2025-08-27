"use client"

import type React from "react"
import { FaUserCircle } from "react-icons/fa"
import Image from "next/image"
import { useUser } from "@/contexts/UserContext"

const SideMenu: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="w-[280px] bg-[#4F85A6] flex flex-col items-center py-6 shadow-xl relative min-h-screen">
    
      <div className="mb-8">
        <Image
          src="/fhologo.png"
          alt="FHO Logo"
          width={80}
          height={80}
          className="h-20 w-auto"
        />
      </div>

      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative mb-4">
          <FaUserCircle size={120} className="text-white drop-shadow-lg" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
        </div>

        <h2 className="text-white text-xl font-semibold mb-2 drop-shadow-sm">{user?.name}</h2>

        <p className="text-white/90 text-sm">{user?.email}</p>
      </div>
      {/* Falcon Logo at Bottom */}
      <div className="mt-auto mb-6">
        <Image
          src="/falcon.png"
          alt="Falcon"
          width={128}
          height={40}
          className="w-32 h-auto"
        />
      </div>
      </div>
  )
}

export default SideMenu