import Link from 'next/link'
// static list of image filenames (served from pages/api/credits/[name])
const IMAGES = [
  'S__71131139_0.jpg',
  'S__71131141_0.jpg',
  'S__71131144.jpg',
  'S__71131143_0.jpg',
  'S__71131142_0.jpg'
]

export default function Credits(){
  return (
    <main className="container py-8 pb-12">
      <header>
        <h1 className="text-2xl font-semibold">เครดิต</h1>
        <p className="text-sm text-gray-600">ผลงานตัวอย่าง</p>
      </header>

      <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {IMAGES.map((name, i) => (
          <div key={i} className="bg-gray-100 rounded overflow-hidden relative">
            <img src={`/api/credits/${encodeURIComponent(name)}`} alt={`เครดิต ${i+1}`} className="w-full h-full object-fit" />
          </div>
        ))}
      </section>

      <footer className="mt-6">
        <Link href="/services" className="btn btn-primary">ไปที่บริการ</Link>
      </footer>
    </main>
  )
}
