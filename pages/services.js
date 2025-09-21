import { useState, useRef } from 'react'
import Link from 'next/link'

// detailed list of services (ids unique). items with no price are info-only
const SERVICE_LIST = [
  // 1 ตรวจสอบบัญชีเงินฝาก (banks)
  { id: 'bank_kbank', name: 'ธนาคารกสิกรไทย', price: 2700, note: '(รอผล 1 วัน)' },
  { id: 'bank_scb', name: 'ธนาคารไทยพาณิชย์', price: 2800, note: '(รอผล 1 วัน)' },
  { id: 'bank_ktb', name: 'ธนาคารกรุงไทย', price: 5500, note: '(รอผล 1-3 วัน)' },
  { id: 'bank_krungsri', name: 'ธนาคารกรุงศรี', price: 5500, note: '(รอผล 1-3 วัน)' },
  { id: 'bank_gsb', name: 'ธนาคารออมสิน', price: 4800, note: '(รอผล 1 วัน)' },
  { id: 'bank_bbl', name: 'ธนาคารกรุงเทพ', price: 2700, note: '(รอผล 1 วัน)' },
  { id: 'bank_uob', name: 'ธนาคารยูโอบี', price: 6500, note: '(รอผล 1-3 วัน)' },
  { id: 'bank_lh', name: 'ธนาคารแลนแอนเฮ้าส์', price: 5500, note: '(รอผล 1-3 วัน)' },
  { id: 'bank_tisco', name: 'ธนาคารทิสโก้', price: 5500, note: '(รอผล 1-3 วัน)' },
  { id: 'bank_tmb', name: 'ธนาคารทหารไทย', price: 6300, note: '(รอผล 3-5 วัน)' },

  // 2 ตรวจสหกรณ์
  { id: 'coop_info', name: 'สหกรณ์ (เพื่อทราบข้อมูล)', price: 250, note: '(รอผล 1-3 วัน)' },
  { id: 'coop_cert', name: 'สหกรณ์ (เอกสารรับรอง)', price: 500, note: '(รอผล 1-7 วัน) จัดส่งเอกสารตัวจริง' },

  // 3 ตรวจกองทุน
  { id: 'fund_bbl', name: 'กองทุนธนาคารกรุงเทพ', price: 2400, note: '(รอผล 1-3 วัน)' },

  // 4 ตรวจทรัพย์สิน
  { id: 'asset_vehicle', name: 'รถยนต์', price: 500, note: '(รอผล 1 วัน)' },

  // 5 ตรวจที่ดิน
  { id: 'land_online', name: 'ตรวจที่ดินออนไลน์ (ทั่วประเทศ)', price: 230, note: '(ได้เป็นไฟล์ Excel รอผล 1-7 วัน)' },
  { id: 'land_realtime', name: 'ตรวจผลที่ดินออนไลน์ (เรียวไทม์)', price: 250, note: '(รอผล 1-3 วัน)' },
  { id: 'land_image_basic', name: 'คัดภาพลักษณ์', price: 400, note: '(รอผล 1-3 วัน)' },
  { id: 'land_image_doc', name: 'คัดภาพลักษณ์(แบบได้เอกสารอื่นๆ)', price: 500, note: '(รอผล 1-3 วัน)' },
  { id: 'land_other', name: 'สัญญาเช่าซื้อ / สัญญาขาย / อื่นๆ', price: 0, note: 'ราคาแจ้งเป็นรายการ' },

  // 6 คัดเบอร์ (Normal / Update)
  { id: 'phone_normal_small', name: 'คัดเบอร์โทร (1-99 ราย) - Normal', price: 120, note: '(รอผล 1-3 วัน)' },
  { id: 'phone_normal_large', name: 'คัดเบอร์โทร (100 ขึ้นไป) - Normal', price: 60, note: '(รอผล 1-3 วัน)' },
  { id: 'phone_update_small', name: 'คัดเบอร์โทร (1-99 ราย) - Update', price: 150, note: '(รอผล 1-3 วัน)' },
  { id: 'phone_update_large', name: 'คัดเบอร์โทร (100 ขึ้นไป) - Update', price: 100, note: '(รอผล 1-3 วัน)' },

  // 7 ตรวจประกันสังคม
  { id: 'ss_realtime', name: 'ปกส. (เรียวไทม์)', price: 250, note: '(รอผล 1-3 วัน)' },
  { id: 'ss_excel', name: 'ปกส. (ไฟล์ Excel 20 รายขึ้นไป)', price: 20, note: '(รอผล 1-4 วัน)' },

  // 8 ตรวจประวัติอาชญกรรม
  { id: 'criminal', name: 'ตรวจประวัติอาชญกรรม', price: 900, note: '(รอผล 1-3 วัน)' },

  // 9 สืบทร.14 (ตัวอย่างรายการที่มีราคา)
  { id: 'trace_home_150', name: 'สืบทายาทกับบุคคลในบ้าน (แบบ A)', price: 150, note: '(รอผล 1-3 วัน) · ค่าคัดจะไม่รวม ทร.14' },
  { id: 'trace_home_170', name: 'สืบทายาทกับบุคคลในบ้าน (แบบ B)', price: 170, note: '(รอผล 1-3 วัน) · พร้อมบัญชีเครือญาติ' },
  { id: 'trace_spouse', name: 'สืบคู่สมรส', price: 170, note: '(รอผล 1-3 วัน)' }
]

// groups for display
const SERVICE_GROUPS = [
  { title: 'ตรวจสอบบัญชีเงินฝาก (ธนาคาร)', ids: ['bank_kbank','bank_scb','bank_ktb','bank_krungsri','bank_gsb','bank_bbl','bank_uob','bank_lh','bank_tisco','bank_tmb'] },
  { title: 'ตรวจสหกรณ์', ids: ['coop_info','coop_cert'] },
  { title: 'ตรวจกองทุน', ids: ['fund_bbl'] },
  { title: 'ตรวจทรัพย์สิน', ids: ['asset_vehicle'] },
  { title: 'ตรวจที่ดิน / เอกสาร', ids: ['land_online','land_realtime','land_image_basic','land_image_doc','land_other'] },
  { title: 'คัดเบอร์โทร (Normal / Update)', ids: ['phone_normal_small','phone_normal_large','phone_update_small','phone_update_large'] },
  { title: 'ตรวจประกันสังคม', ids: ['ss_realtime','ss_excel'] },
  { title: 'ตรวจประวัติอาชญกรรม', ids: ['criminal'] },
  { title: 'สืบทร.14', ids: ['trace_home_150','trace_home_170','trace_spouse'] }
]

export default function Services(){
  const [items, setItems] = useState(SERVICE_LIST.map(s => ({...s, qty: 0})))
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [entries, setEntries] = useState([])
  const entryIdRef = useRef(1)
  const subtotal = items.reduce((s,i)=> (typeof i.price === 'number') ? s + i.price * i.qty : s, 0)
  const totalQty = items.reduce((s,i)=> s + (i.qty || 0), 0)

  function changeQty(id, delta){
    setItems(prev => prev.map(it => it.id === id ? {...it, qty: Math.max(0, it.qty + delta)} : it))
    // sync per-person entries
    setEntries(prev => {
      const next = [...prev]
      if(delta > 0){
        for(let i=0;i<delta;i++){
          // if land image services, prepare land-specific fields
          if(id === 'land_image_basic' || id === 'land_image_doc'){
            next.push({ entryId: entryIdRef.current++, serviceId: id, deedNo: '', subdistrict: '', district: '', province: '' })
          } else {
            next.push({ entryId: entryIdRef.current++, serviceId: id, personName: '', personNid: '' })
          }
        }
      } else if(delta < 0){
        let toRemove = -delta
        for(let i = next.length - 1; i >= 0 && toRemove > 0; i--){
          if(next[i].serviceId === id){ next.splice(i,1); toRemove-- }
        }
      }
      return next
    })
  }

  function handleRemoveEntry(entryId){
    // remove the entry and decrement the corresponding item's qty
    setEntries(prev => {
      const entry = prev.find(e => e.entryId === entryId)
      if(!entry) return prev
      const next = prev.filter(e => e.entryId !== entryId)
      // decrement item qty
      setItems(itPrev => itPrev.map(it => it.id === entry.serviceId ? {...it, qty: Math.max(0, it.qty - 1)} : it))
      return next
    })
  }

  function handleEntryChange(entryId, field, value){
    setEntries(prev => prev.map(e => e.entryId === entryId ? {...e, [field]: value} : e))
  }

  async function handleSubmit(e){
    e.preventDefault()
    setMessage(null)
  if(!name) return setMessage({type:'error', text:'กรุณากรอก ชื่อ นามสกุล'})
  if(!phone) return setMessage({type:'error', text:'กรุณากรอก เบอร์มือถือ'})
  if(!address) return setMessage({type:'error', text:'กรุณากรอก ที่อยู่สำหรับจัดส่งเอกสาร'})
    if(subtotal <= 0) return setMessage({type:'error', text:'กรุณาเลือกบริการอย่างน้อย 1 รายการ'})

  // validate per-person entries: count must match total quantities and each entry must have required fields
  if(entries.length !== totalQty) return setMessage({type:'error', text:'กรุณากรอกข้อมูลผู้ถูกตรวจให้ครบถ้วน (จำนวนการ์ดไม่ตรงกับจำนวนที่เลือก)'});
  const missing = entries.find(e => {
    if(e.serviceId === 'land_image_basic' || e.serviceId === 'land_image_doc'){
      return !e.deedNo || !e.subdistrict || !e.district || !e.province
    }
    return !e.personName || !e.personNid
  })
  if(missing) return setMessage({type:'error', text:'กรุณากรอกข้อมูลให้ครบถ้วนสำหรับผู้ถูกตรวจทุกราย'})

  const selected = items.filter(i=>i.qty>0).map(i=>({id:i.id,name:i.name,qty:i.qty,price:i.price}))
  const payload = { name, address, phone, items: selected, total: subtotal, entries }

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
  setEntries([])
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
            <p className="text-sm text-gray-600 mt-1">เลือกจำนวนเพื่อคำนวณราคา จากนั้นกรอกข้อมูลสำหรับติดต่อและที่อยู่เพื่อรับเอกสาร</p>
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
                    <div className="text-sm text-gray-500">{typeof it.price === 'number' && it.price > 0 ? `${it.price} ฿` : (typeof it.price === 'number' && it.price === 0 ? 'ราคา แจ้งเป็นรายการ' : 'ราคา ตามรายละเอียด')} {it.note ? `· ${it.note}` : ''}</div>
                  </div>
                  <div>
                    {typeof it.price === 'number' ? (
                      <div className="flex items-center gap-2">
                        <button onClick={()=>changeQty(it.id, -1)} aria-label={`ลด ${it.name}`} className="w-8 h-8 rounded border">-</button>
                        <span className="w-6 text-center">{it.qty}</span>
                        <button onClick={()=>changeQty(it.id, 1)} aria-label={`เพิ่ม ${it.name}`} className="w-8 h-8 rounded border">+</button>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">{it.note || ''}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}

      <section className="mt-6 border-t pt-4">

        {/* per-person entry cards (one card per selected unit) */}
        {entries.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">ข้อมูลผู้ถูกตรวจ ({entries.length} ราย)</h4>
            <div className="grid grid-cols-1 gap-3">
              {entries.map((en, idx) => {
                const service = items.find(it => it.id === en.serviceId)
                const isLand = en.serviceId === 'land_image_basic' || en.serviceId === 'land_image_doc'
                return (
                  <div key={en.entryId} className="p-3 border rounded bg-gray-50 relative">
                    <button type="button" onClick={()=>handleRemoveEntry(en.entryId)} aria-label="ลบ" className="absolute right-2 top-2 text-gray-500 hover:text-red-600">✕</button>
                    <div className="text-sm text-gray-600 mb-2">{idx+1}. {service ? service.name : en.serviceId}</div>
                    {isLand ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs block mb-1">เลขที่โฉนด</label>
                          <input value={en.deedNo} onChange={e=>handleEntryChange(en.entryId, 'deedNo', e.target.value)} type="text" className="border rounded px-2 py-1 w-full" />
                        </div>
                        <div>
                          <label className="text-xs block mb-1">ตำบล/แขวง</label>
                          <input value={en.subdistrict} onChange={e=>handleEntryChange(en.entryId, 'subdistrict', e.target.value)} type="text" className="border rounded px-2 py-1 w-full" />
                        </div>
                        <div>
                          <label className="text-xs block mb-1">อำเภอ/เขต</label>
                          <input value={en.district} onChange={e=>handleEntryChange(en.entryId, 'district', e.target.value)} type="text" className="border rounded px-2 py-1 w-full" />
                        </div>
                        <div>
                          <label className="text-xs block mb-1">จังหวัด</label>
                          <input value={en.province} onChange={e=>handleEntryChange(en.entryId, 'province', e.target.value)} type="text" className="border rounded px-2 py-1 w-full" />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs block mb-1">ชื่อ นามสกุล</label>
                          <input value={en.personName} onChange={e=>handleEntryChange(en.entryId, 'personName', e.target.value)} type="text" className="border rounded px-2 py-1 w-full" />
                        </div>
                        <div>
                          <label className="text-xs block mb-1">เลขบัตรประชาชน</label>
                          <input value={en.personNid} onChange={e=>handleEntryChange(en.entryId, 'personNid', e.target.value)} type="text" className="border rounded px-2 py-1 w-full" />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="text-lg">ยอดรวม: <strong>{subtotal} ฿</strong></div>
        <form onSubmit={handleSubmit} className="mt-3 w-full bg-white p-6 rounded-md border mx-auto">
          <div className="grid grid-cols-1 gap-4 items-start">

            <div className="w-full md:grid-cols-2">
              <div className="md:w-full">
                <label className="text-sm block mb-1">ชื่อ นามสกุล</label>
                <input value={name} onChange={e=>setName(e.target.value)} type="text" className="border rounded px-3 py-2 w-full" />
              </div>
              <div className="md:w-full">
                <label className="text-sm block mb-1">เบอร์มือถือ</label>
                <input value={phone} onChange={e=>setPhone(e.target.value)} type="tel" className="border rounded px-3 py-2 w-full" />
              </div>
              {/* email removed - contact via phone and name/address required */}
              <div className="md:w-full">
                <label className="text-sm block mb-1">ที่อยู่สำหรับจัดส่งเอกสาร</label>
                <textarea value={address} onChange={e=>setAddress(e.target.value)} className="border rounded px-3 py-2 w-full" rows={3} />
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
