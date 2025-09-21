import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/Footer'
import heroSrc from '../images/hero.jpg'

const ALL_SERVICES = [
  {id:'deposit', name:'บัญชีเงินฝาก'},
  {id:'promptpay', name:'ตรวจพร้อมเพย์ธนาคาร'},
  {id:'cooperative', name:'รับตรวจสหกรณ์'},
  {id:'land', name:'สืบทรัพย์ตามทะเบียนบ้าน'},
  {id:'land_docs', name:'คัดเอกสารที่ดิน'},
  {id:'field', name:'ลงพื้นที่คัดเอกสารที่ดิน'},
  {id:'seize', name:'ยึดทรัพย์ / บังคับคดี'},
  {id:'phone', name:'คัดเบอร์โทร'},
  {id:'ss', name:'คัดประกันสังคม'},
  {id:'criminal', name:'ตรวจสอบประวัติอาชญากรรม'},
  {id:'vehicle', name:'ตรวจรถ'},
  {id:'fund', name:'ตรวจกองทุน'}
]

export default function Home(){
  // show a small set of recommended services on the homepage to keep it clean on mobile
  const visible = [
    {id:'deposit', name:'บัญชีเงินฝาก'},
    {id:'land', name:'ตรวจที่ดิน'},
    {id:'vehicle', name:'ตรวจรถ'},
    {id:'phone', name:'ตรวจเบอร์โทร'}
  ]
  const heroRef = useRef(null)

  return (
    <main className="flex flex-col w-screen">
  <section ref={heroRef} className="hero-hero relative">
        <div className="absolute inset-0 -z-10">
          <Image src={heroSrc} alt="Hero" fill style={{objectFit:'cover'}} priority />
          <div className="hero-overlay" />
        </div>
  <div className="hero-inner container py-6 md:py-10 flex flex-col justify-between">
          <div className="hero-content">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold">บริการรับตรวจ</h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg max-w-2xl">บริการตรวจสอบทรัพย์สิน บัญชีเงินฝาก สหกรณ์ และอื่นๆ โดยทีมงานมืออาชีพ พร้อมลงพื้นที่และให้คำปรึกษา</p>
            <div className="hero-buttons mt-5 flex gap-3">
              <Link href="/services" className="btn btn-primary">เลือกบริการ</Link>
              <Link href="/credits" className="btn-ghost">เครดิต</Link>
            </div>
          </div>

          {/* features card placed inside hero so whole page fits 100vh */}
          <div className="w-full max-w-3xl mx-auto px-6 lg:px-9 md:px-10 sm:px-5">
            <section className="features bg-white p-6 md:p-8 sm:p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">บริการแนะนำ</h2>
              <p className="text-sm text-gray-600 mt-1">บริการยอดนิยมที่ลูกค้ามักเลือก</p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0">
                {visible.map((s)=> (
                  <li key={s.id} className="bg-gray-50 border rounded overflow-hidden">
                    <Link href={`/services#${s.id}`} className="block px-6 py-4 w-full h-full text-gray-800 hover:bg-gray-100">{s.name}</Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-right">
                <Link href="/services" className="text-sm text-blue-600 hover:underline">...เพิ่มเติม</Link>
              </div>
            </section>
          </div>
        </div>
      </section>
      
    </main>
  )
}
