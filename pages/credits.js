import Link from 'next/link'

const IMAGES = Array.from({length:12}).map((_,i)=> ({id:i, title:`ภาพ ${i+1}`}))

export default function Credits(){
  return (
  <main className="container py-8 pb-12">
      <header>
        <h1 className="text-2xl font-semibold">เครดิต</h1>
        <p className="text-sm text-gray-600">ผลงานตัวอย่าง</p>
      </header>

      <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {IMAGES.map(img => (
          <div key={img.id} className="bg-gray-100 h-40 sm:h-36 rounded flex items-center justify-center">{img.title}</div>
        ))}
      </section>

      <footer className="mt-6">
        <Link href="/services" className="btn btn-primary">ไปที่บริการ</Link>
      </footer>
    </main>
  )
}
