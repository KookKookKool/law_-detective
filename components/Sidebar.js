import Link from 'next/link'

export default function Sidebar({ open, onClose }){
  const handleClose = () => { if (onClose) onClose() }

  return (
    <div aria-hidden={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      {/* backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/45 transition-opacity duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* panel */}
  <aside className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ${open ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-semibold">เมนู</div>
          <button onClick={handleClose} aria-label="ปิดเมนู" className="p-2 text-lg">✕</button>
        </div>

        <nav className="p-4 flex flex-col gap-3">
          <Link href="/" onClick={handleClose} className="text-gray-800 hover:text-blue-600">หน้าแรก</Link>
          <Link href="/credits" onClick={handleClose} className="text-gray-800 hover:text-blue-600">เครดิต</Link>
          <hr />
          <div className="text-sm text-gray-600">บริการทั้งหมด</div>
          <ul className="mt-2 list-none p-0 flex flex-col gap-2 text-gray-700">
            <li><Link href="/services#deposit" onClick={handleClose} className="block px-2 py-2 hover:bg-gray-50">บัญชีเงินฝาก</Link></li>
            <li><Link href="/services#promptpay" onClick={handleClose} className="block px-2 py-2 hover:bg-gray-50">ตรวจพร้อมเพย์ธนาคาร</Link></li>
            <li><Link href="/services#cooperative" onClick={handleClose} className="block px-2 py-2 hover:bg-gray-50">รับตรวจสหกรณ์</Link></li>
            <li><Link href="/services#land" onClick={handleClose} className="block px-2 py-2 hover:bg-gray-50">คัดเอกสารที่ดิน</Link></li>
            <li><Link href="/services#field" onClick={handleClose} className="block px-2 py-2 hover:bg-gray-50">ลงพื้นที่คัดเอกสารที่ดิน</Link></li>
            <li><Link href="/services#seize" onClick={handleClose} className="block px-2 py-2 hover:bg-gray-50">ยึดทรัพย์ / บังคับคดี</Link></li>
            <li><Link href="/services#phone" onClick={handleClose} className="block px-2 py-2 hover:bg-gray-50">คัดเบอร์โทร</Link></li>
            <li><Link href="/services#ss" onClick={handleClose} className="block px-2 py-2 hover:bg-gray-50">คัดประกันสังคม</Link></li>
            <li><Link href="/services#criminal" onClick={handleClose} className="block px-2 py-2 hover:bg-gray-50">ตรวจสอบประวัติอาชญากรรม</Link></li>
            <li><Link href="/services#vehicle" onClick={handleClose} className="block px-2 py-2 hover:bg-gray-50">ตรวจรถ</Link></li>
          </ul>
        </nav>
      </aside>
    </div>
  )
}
