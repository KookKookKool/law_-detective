import { useState } from 'react'
import Link from 'next/link'
import Sidebar from './Sidebar'

export default function Header(){
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="site-header w-full bg-white shadow">
        <div className="container h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button aria-label="เปิดเมนู" onClick={()=>setOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M3 12h18M3 18h18" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="text-lg md:text-2xl lg:text-3xl font-bold">บริการรับตรวจ</div>
          </div>
        </div>
      </header>
      <Sidebar open={open} onClose={()=>setOpen(false)} />
    </>
  )
}
