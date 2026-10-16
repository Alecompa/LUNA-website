import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
const root=path.resolve('out')
const base=(process.env.NEXT_PUBLIC_BASE_PATH||'').replace(/\/$/,'')
const port=Number(process.env.PORT||4173)
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.txt':'text/plain; charset=utf-8','.csv':'text/csv; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.pdf':'application/pdf','.zip':'application/zip'}
await fs.access(path.join(root,'index.html'))
http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)
  if(base&&pathname!==base&&!pathname.startsWith(base+'/')){res.writeHead(404);res.end('Not found');return}
  const file=path.resolve(root,'.'+(pathname.slice(base.length)||'/'))
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return}
  let target=file
  if((await fs.stat(file)).isDirectory()){
   if(!pathname.endsWith('/')){res.writeHead(301,{Location:pathname+'/'});res.end();return}
   target=path.join(file,'index.html')
  }
  const content=await fs.readFile(target)
  res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream','Content-Length':content.length,'Cache-Control':'no-cache'})
  res.end(req.method==='HEAD'?undefined:content)
 }catch{res.writeHead(404,{'Content-Type':'text/html'});res.end(await fs.readFile(path.join(root,'404.html')).catch(()=>'Not found'))}
}).listen(port,'127.0.0.1',()=>console.log(`LUNA static preview: http://127.0.0.1:${port}${base}/`))
