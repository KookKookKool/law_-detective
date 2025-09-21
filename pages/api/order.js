export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { email, phone, items } = req.body || {}
  if (!email || !phone || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Missing fields: email, phone, items' })
  }

  // Minimal validation passed — in real app you'd persist the order or send an email
  console.log('Received order', { email, phone, items })

  return res.status(200).json({ ok: true, message: 'Order received', data: { email, phone, items } })
}
