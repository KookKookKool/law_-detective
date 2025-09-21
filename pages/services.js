import { useState } from 'react'
import Link from 'next/link'

// flat list of all selectable service items (unique ids)
const SERVICE_LIST = [
  { id: 'deposit', name: 'บัญชีเงินฝาก', price: 500 },
  { id: 'promptpay', name: 'ตรวจพร้อมเพย์ธนาคาร', price: 700 },

  { id: 'cooperative_basic', name: 'ตรวจสหกรณ์ (ไม่รับรอง)', price: 700 },
  { id: 'cooperative_cert', name: 'ตรวจสหกรณ์ (รับรอง)', price: 1200 },

  // land / document related
  { id: 'land_search', name: 'สืบทรัพย์ตามทะเบียนบ้าน', price: 1500 },
  { id: 'land_docs', name: 'คัดเอกสารที่ดิน', price: 1200 },
  { id: 'land_image', name: 'ภาพลักษณ์ทรัพย์ / ถ่ายภาพ', price: 1000 },

  // field services
  { id: 'field', name: 'ลงพื้นที่คัดเอกสารที่ดิน ณ ที่ตั้งทรัพย์', price: 2500 },
  { id: 'field_photo', name: 'ถ่ายรูปพื้นที่', price: 800 },
  { id: 'field_map', name: 'ทำแผนที่/แผนผัง', price: 900 },

  // enforcement / seizure
  { id: 'seize', name: 'ยึดทรัพย์ / บังคับคดี', price: 3000 },
  { id: 'seize_spouse', name: 'ยึดทรัพย์คู่สมรส', price: 2800 },
  { id: 'seize_onbehalf', name: 'บังคับคดีแทน', price: 2500 },
  { id: 'garnish_salary', name: 'อายัดเงินเดือน', price: 1800 },
  { id: 'garnish_deposit', name: 'อายัดเงินฝาก', price: 1800 },

  { id: 'phone', name: 'คัดเบอร์โทร', price: 300 },
  { id: 'ss', name: 'คัดประกันสังคม', price: 400 },
  { id: 'criminal', name: 'ตรวจสอบประวัติอาชญากรรม', price: 600 },
  { id: 'vehicle', name: 'ตรวจรถ', price: 1000 },
  { id: 'fund', name: 'ตรวจกองทุน', price: 700 },
]

// groups define how services are displayed on the page (ids reference SERVICE_LIST)
const SERVICE_GROUPS = [
  { title: 'พื้นฐาน', ids: ['deposit','promptpay','cooperative_basic','cooperative_cert'] },
  { title: 'สืบทรัพย์ / เอกสาร', ids: ['land_search','land_docs','land_image'] },
  { title: 'ลงพื้นที่', ids: ['field','field_photo','field_map'] },
  { title: 'ยึดทรัพย์ / บังคับคดี', ids: ['seize','seize_spouse','seize_onbehalf','garnish_salary','garnish_deposit'] },
  { title: 'อื่นๆ', ids: ['phone','ss','criminal','vehicle','fund'] }
]

export default function Services(){
  const [items, setItems] = useState(SERVICE_LIST.map(s => ({...s, qty: 0})))
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const subtotal = items.reduce((s,i)=> s + i.price * i.qty, 0)

  function changeQty(id, delta){
    setItems(prev => prev.map(it => it.id === id ? {...it, qty: Math.max(0, it.qty + delta)} : it))
  }

  async function handleSubmit(e){
    e.preventDefault()
    setMessage(null)
    if(!email || !phone) return setMessage({type:'error', text:'กรุณากรอก Email และ เบอร์มือถือ'})
    if(subtotal <= 0) return setMessage({type:'error', text:'กรุณาเลือกบริการอย่างน้อย 1 รายการ'})

    const selected = items.filter(i=>i.qty>0).map(i=>({id:i.id,name:i.name,qty:i.qty,price:i.price}))
    const payload = { email, phone, items: selected, total: subtotal }

    try{
      setLoading(true)
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data.error || 'Server error')
      setMessage({type:'success', text:'ส่งคำสั่งเรียบร้อย ทางเราจะติดต่อกลับ'})
      // reset quantities but keep contact
      setItems(SERVICE_LIST.map(s=> ({...s, qty:0})))
    }catch(err){
      setMessage({type:'error', text:err.message || 'เกิดข้อผิดพลาด'})
    }finally{
      setLoading(false)
    }
  }

  return (
    <main className="container py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">เลือกบริการ</h1>
        <p className="text-sm text-gray-600 mt-1">เลือกจำนวนเพื่อคำนวณราคา จากนั้นกรอก Email และ เบอร์มือถือเพื่อรับเอกสาร</p>
      </header>

      {SERVICE_GROUPS.map(group => (
        <section key={group.title} className="mt-4">
          <h3 className="text-lg font-semibold mb-2">{group.title}</h3>
          <div className="grid grid-cols-1 gap-3">
            {group.ids.map(id => {
              const it = items.find(x => x.id === id)
              if(!it) return null
              return (
                <div id={it.id} key={it.id} className="flex flex-row justify-between items-center p-3 border rounded">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-500">{it.price} ฿</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={()=>changeQty(it.id, -1)} aria-label={`ลด ${it.name}`} className="w-8 h-8 rounded border">-</button>
                    <span className="w-6 text-center">{it.qty}</span>
                    <button onClick={()=>changeQty(it.id, 1)} aria-label={`เพิ่ม ${it.name}`} className="w-8 h-8 rounded border">+</button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}

      <section className="mt-6 border-t pt-4">
        <div className="text-lg">ยอดรวม: <strong>{subtotal} ฿</strong></div>
        <form onSubmit={handleSubmit} className="mt-3 w-full bg-white p-6 rounded-md border mx-auto">
          <div className="grid grid-cols-1 gap-4 items-start">

            <div className="w-full md:grid-cols-2">
              <div className="md:w-full">
                <label className="text-sm block mb-1">Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="border rounded px-3 py-2 w-full" />
              </div>
              <div className="md:w-full">
                <label className="text-sm block mb-1">เบอร์มือถือ</label>
                <input value={phone} onChange={e=>setPhone(e.target.value)} type="tel" className="border rounded px-3 py-2 w-full" />
              </div>
            </div>

              <button type="submit" className="btn btn-primary w-full text-center h-10" disabled={loading}>{loading? 'กำลังส่ง...' : 'ส่งเอกสาร'}</button>
              <Link href="/" className="btn w-full text-center h-10">กลับหน้าแรก</Link>
          </div>
        </form>
        {message && (
          <div className={`message ${message.type === 'success' ? 'message-success' : 'message-error'}`}>{message.text}</div>
        )}
      </section>
    </main>
  )
}
