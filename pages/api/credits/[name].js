import fs from 'fs'
import path from 'path'

export default function handler(req, res){
  const { name } = req.query
  if(!name) return res.status(400).end('Missing name')
  const base = path.join(process.cwd(), 'images', 'credits')
  const filePath = path.join(base, name)
  if(!fs.existsSync(filePath)) return res.status(404).end('Not found')
  const stat = fs.statSync(filePath)
  const ext = path.extname(filePath).toLowerCase()
  const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.png' ? 'image/png' : 'application/octet-stream'
  res.setHeader('Content-Type', mime)
  res.setHeader('Content-Length', stat.size)
  const stream = fs.createReadStream(filePath)
  stream.pipe(res)
}
