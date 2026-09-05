const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { createAgentService } = require('./agent-service.cjs');
const { createSpeechService } = require('./speech-service.cjs');

const root = __dirname;
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT) || 8765;
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.cjs':'text/javascript; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml' };
const service=createAgentService();
const speech=createSpeechService();
const json=(response,status,value,headers={})=>{response.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers});response.end(JSON.stringify(value,null,2))};
const html=(response,status,value)=>{response.writeHead(status,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Content-Security-Policy':"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'"});response.end(value)};
const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const page=body=>`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Clover Agent Ordering</title><style>body{max-width:760px;margin:40px auto;padding:0 20px;background:#f2fbf5;color:#18352a;font:16px/1.65 system-ui}article{padding:22px;border:1px solid #b9d8c7;border-radius:20px;background:white}code,pre{background:#eef5f0;border-radius:8px}pre{padding:12px;overflow:auto}button{padding:12px 18px;border:0;border-radius:99px;background:#237a54;color:white;font-weight:800}a{color:#126747}li{margin:8px 0}</style><body>${body}</body></html>`;
const requestBaseUrl=request=>{
  const forwarded=String(request.headers['x-forwarded-proto']||'').split(',')[0].trim().toLowerCase();
  const protocol=forwarded==='https'?'https':'http';
  return `${protocol}://${request.headers.host||'127.0.0.1:8765'}`;
};
function readJson(request){return new Promise((resolve,reject)=>{let raw='';request.on('data',chunk=>{raw+=chunk;if(Buffer.byteLength(raw)>16384){reject(Error('request too large'));request.destroy()}});request.on('end',()=>{try{resolve(JSON.parse(raw||'{}'))}catch{reject(Error('invalid JSON'))}});request.on('error',reject)})}
const cookieValue=(request,name)=>String(request.headers.cookie||'').split(';').map(part=>part.trim()).find(part=>part.startsWith(`${name}=`))?.slice(name.length+1)||'';
http.createServer(async (request, response) => {
  const baseUrl=requestBaseUrl(request),parsed=new URL(request.url,baseUrl),pathname=decodeURIComponent(parsed.pathname);
  try{
    if(request.method==='GET'&&pathname==='/agent'){
      const sessionId=parsed.searchParams.get('session')||'',sessionNote=sessionId?`<p>本次畫面識別碼：<code>${escapeHtml(sessionId)}</code>。建立草稿時必須在 JSON 加入同一個 <code>sessionId</code>，讓原畫面只追蹤這次點餐。</p>`:'<p>此網址沒有畫面識別碼；可以建立獨立草稿，但無法同步回原本的光球畫面。</p>';
      return html(response,200,page(`<article><h1>Clover AI Agent 點餐入口</h1><p>這是給個人 AI 閱讀的標準 HTTP + JSON 示範介面。請先向使用者確認點餐意圖，再讀菜單並建立未送出的草稿。建立後請使用者回到原本的 Clover 點餐畫面確認，不要代替使用者確認。</p>${sessionNote}<ol><li><code>GET /api/menu?lang=${escapeHtml(parsed.searchParams.get('lang')||'zh')}</code> — 公開菜單</li><li><code>POST /api/drafts</code> — JSON: requestId, menuVersion, table, language, sessionId, lines[{itemId,quantity,optionKeys}]</li><li><code>GET /api/drafts/{draftId}</code> — 草稿與確認狀態</li><li><code>GET /api/orders/{orderId}</code> — 人工確認後的示範訂單</li></ol><p>Agent 不得提交價格、總額、付款或核准狀態。草稿不等於訂單。</p><p><a href="/api/menu?lang=${escapeHtml(parsed.searchParams.get('lang')||'zh')}">讀取 JSON 菜單</a></p></article>`));
    }
    if(request.method==='GET'&&pathname==='/api/menu')return json(response,200,service.publicMenu(parsed.searchParams.get('lang')));
    if(request.method==='POST'&&pathname==='/api/speech'){
      try{
        const result=await speech.generate(await readJson(request));
        response.writeHead(200,{'Content-Type':result.contentType,'Content-Length':result.audio.length,'Cache-Control':'private, max-age=3600','X-Speech-Provider':'elevenlabs','X-Speech-Cache':result.cached?'HIT':'MISS'});
        return response.end(result.audio);
      }catch(error){return json(response,error.status||502,{error:error.message})}
    }
    if(request.method==='POST'&&pathname==='/api/agent-sessions'){
      const session=service.createSession(await readJson(request),baseUrl),secure=baseUrl.startsWith('https://')?'; Secure':'';
      return json(response,201,session,{'Set-Cookie':`clover_confirmation_${session.sessionId}=${session._confirmationToken}; HttpOnly; SameSite=Strict; Max-Age=900; Path=/api/agent-sessions/${encodeURIComponent(session.sessionId)}/confirm${secure}`});
    }
    const sessionMatch=pathname.match(/^\/api\/agent-sessions\/([A-Za-z0-9_-]+)$/);if(request.method==='GET'&&sessionMatch)return json(response,200,service.getSession(sessionMatch[1]));
    const sessionConfirmMatch=pathname.match(/^\/api\/agent-sessions\/([A-Za-z0-9_-]+)\/confirm$/);if(request.method==='POST'&&sessionConfirmMatch)return json(response,200,service.confirmSession(sessionConfirmMatch[1],decodeURIComponent(cookieValue(request,`clover_confirmation_${sessionConfirmMatch[1]}`))));
    if(request.method==='POST'&&pathname==='/api/drafts')return json(response,201,service.createDraft(await readJson(request),baseUrl));
    const draftMatch=pathname.match(/^\/api\/drafts\/([A-Za-z0-9-]+)$/);if(request.method==='GET'&&draftMatch)return json(response,200,service.getDraft(draftMatch[1]));
    const orderMatch=pathname.match(/^\/api\/orders\/([A-Za-z0-9-]+)$/);if(request.method==='GET'&&orderMatch)return json(response,200,service.getOrder(orderMatch[1]));
    if(request.method==='GET'&&pathname==='/review'){
      const draft=service.getDraft(parsed.searchParams.get('draft')),token=parsed.searchParams.get('token')||'',lines=draft.lines.map(line=>`<li>${escapeHtml(line.name)} × ${line.quantity} — NT$${line.lineTotal}</li>`).join('');
      const accepted=draft.status==='accepted'?`<p>已接受，訂單編號 ${escapeHtml(draft.orderId)}</p>`:`<form method="post" action="/review/confirm"><input type="hidden" name="draft" value="${escapeHtml(draft.draftId)}"><input type="hidden" name="token" value="${escapeHtml(token)}"><button>確認送出示範訂單</button></form>`;
      return html(response,200,page(`<article><h1>人工確認訂單草稿</h1><p>草稿 ${escapeHtml(draft.draftId)}｜桌號 ${escapeHtml(draft.table)}｜狀態 ${escapeHtml(draft.status)}</p><ul>${lines}</ul><h2>合計 NT$${draft.total}</h2>${accepted}<p>此操作只進入本機模擬訂單列表，不連接付款、廚房或 POS。</p></article>`));
    }
    if(request.method==='POST'&&pathname==='/review/confirm'){
      let raw='';for await(const chunk of request){raw+=chunk;if(Buffer.byteLength(raw)>4096)throw Error('request too large')}const form=new URLSearchParams(raw),draftId=form.get('draft'),token=form.get('token');service.confirmDraft(draftId,token);
      response.writeHead(303,{'Location':`/review?draft=${encodeURIComponent(draftId)}&token=${encodeURIComponent(token)}`,'Cache-Control':'no-store'});return response.end();
    }
    if(request.method==='GET'&&pathname==='/orders'){const orders=service.listOrders();return html(response,200,page(`<article><h1>模擬餐廳訂單</h1>${orders.length?orders.map(order=>`<p><strong>${escapeHtml(order.orderId)}</strong>｜桌號 ${escapeHtml(order.table)}｜NT$${order.total}｜${escapeHtml(order.status)}</p>`).join(''):'<p>目前沒有已確認訂單。</p>'}</article>`))}
  }catch(error){return json(response,400,{error:error.message})}
  const file = path.resolve(root, pathname === '/' ? 'index.html' : `.${pathname}`);
  const relative = path.relative(root, file);
  if (relative.startsWith('..') || path.isAbsolute(relative)) { response.writeHead(403).end('Forbidden'); return; }
  fs.readFile(file, (error, data) => {
    if (error) { response.writeHead(error.code === 'ENOENT' ? 404 : 500).end('Not found'); return; }
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store' });
    response.end(data);
  });
}).listen(port, host, () => console.log(`Clover preview: http://${host}:${port}`));
