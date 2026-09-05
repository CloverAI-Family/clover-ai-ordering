'use strict';

const crypto = require('node:crypto');

const MENU_VERSION = '2026-09-05-v1';
const CURRENCY = 'TWD';
const ITEMS = [
  [1,'main','蛋餅','Egg Pancake',45,['cheese']],
  [2,'main','三明治','Sandwich',55,['cheese','noLettuce']],
  [3,'main','漢堡','Hamburger',65,['eggAdd','cheese','noLettuce','noTomato']],
  [4,'main','鐵板麵','Sizzling Noodles',60,['meat','eggAdd']],
  [5,'main','蘿蔔糕','Turnip Cake',35,['eggAdd']],
  [6,'drink','紅茶','Black Tea',15,['medium','large','sugar0','sugarHalf','sugarFull','iceNone','iceLess','iceNormal']],
  [7,'drink','奶茶','Milk Tea',25,['medium','large','sugar0','sugarHalf','sugarFull','iceNone','iceLess','iceNormal']],
  [8,'drink','豆漿','Soy Milk',20,['medium','large','sugar0','sugarHalf','sugarFull','iceNone','iceLess','iceNormal']],
  [9,'drink','咖啡','Coffee',35,['medium','large','sugar0','sugarHalf','sugarFull','iceNone','iceLess','iceNormal']],
  [10,'drink','柳橙汁','Orange Juice',30,['medium','large','iceNone','iceLess','iceNormal']],
  [11,'snack','雞塊','Chicken Nuggets',40,['ketchup','pepper']],
  [12,'snack','熱狗','Hot Dog',35,['ketchup','pepper']],
  [13,'snack','薯條','French Fries',40,['ketchup','pepper']]
].map(([id,category,zh,en,price,optionKeys])=>({id,category,names:{zh,en,ja:en,ko:en},price,available:true,optionKeys}));
const OPTION_PRICES={cheese:5,eggAdd:5,meat:10,large:5,noLettuce:0,noTomato:0,medium:0,sugar0:0,sugarHalf:0,sugarFull:0,iceNone:0,iceLess:0,iceNormal:0,ketchup:0,pepper:0};

function createAgentService({now=()=>Date.now(),ttlMs=15*60*1000}={}){
  const sessions=new Map(),drafts=new Map(),requests=new Map(),orders=new Map();let draftSeq=0,orderSeq=0;
  const clone=value=>JSON.parse(JSON.stringify(value));
  const language=value=>['zh','ja','en','ko'].includes(value)?value:'en';
  function publicMenu(lang='en'){
    const use=language(lang);return {restaurantId:'clover-ai-ordering-demo',menuVersion:MENU_VERSION,currency:CURRENCY,items:ITEMS.map(item=>({id:item.id,category:item.category,name:item.names[use],price:item.price,available:item.available,optionKeys:[...item.optionKeys]}))};
  }
  function createSession(body={},baseUrl=''){
    const allowed=['table','language'];
    if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).some(key=>!allowed.includes(key)))throw new Error('invalid session schema');
    const table=String(body.table||'1').slice(0,20),lang=language(body.language),createdAt=now(),expiresAt=createdAt+ttlMs,sessionId=`S_${crypto.randomBytes(18).toString('base64url')}`;
    const session={sessionId,status:'waiting_for_agent',restaurantId:'clover-ai-ordering-demo',table,language:lang,createdAt:new Date(createdAt).toISOString(),expiresAt:new Date(expiresAt).toISOString(),agentUrl:`${baseUrl}/agent?restaurant=clover-ai-ordering-demo&table=${encodeURIComponent(table)}&lang=${encodeURIComponent(lang)}&session=${encodeURIComponent(sessionId)}`,statusUrl:`${baseUrl}/api/agent-sessions/${encodeURIComponent(sessionId)}`};
    Object.defineProperty(session,'_expiresAt',{value:expiresAt,writable:false,enumerable:false});sessions.set(sessionId,session);return clone(session);
  }
  function getSession(id){
    const session=sessions.get(id);if(!session)throw new Error('session not found');if(session.status!=='accepted'&&now()>session._expiresAt)session.status='expired';return clone(session);
  }
  function createDraft(body={},baseUrl=''){
    const allowed=['requestId','menuVersion','table','language','lines','sessionId'];
    if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).some(key=>!allowed.includes(key)))throw new Error('invalid draft schema');
    if(typeof body.requestId!=='string'||!body.requestId.trim()||body.requestId.length>100)throw new Error('requestId is required');
    if(requests.has(body.requestId))return clone(drafts.get(requests.get(body.requestId)));
    if(body.menuVersion!==MENU_VERSION)throw new Error('menuVersion is stale or missing');
    if(!Array.isArray(body.lines)||body.lines.length<1||body.lines.length>20)throw new Error('lines must contain 1 to 20 entries');
    const lang=language(body.language),table=String(body.table||'1').slice(0,20);
    let session=null;
    if(body.sessionId!==undefined){
      if(typeof body.sessionId!=='string'||body.sessionId.length>100)throw new Error('invalid sessionId');
      session=sessions.get(body.sessionId);if(!session)throw new Error('session not found');if(now()>session._expiresAt){session.status='expired';throw new Error('session expired')}if(session.status!=='waiting_for_agent')throw new Error('session already has a draft');if(session.table!==table)throw new Error('session table mismatch');if(session.language!==lang)throw new Error('session language mismatch');
    }
    const lines=body.lines.map(line=>{
      if(!line||typeof line!=='object'||Array.isArray(line)||Object.keys(line).some(key=>!['itemId','quantity','optionKeys'].includes(key)))throw new Error('invalid line schema');
      const item=ITEMS.find(entry=>entry.id===line.itemId);if(!item||!item.available)throw new Error(`item ${line.itemId} is unavailable`);
      if(!Number.isInteger(line.quantity)||line.quantity<1||line.quantity>20)throw new Error('quantity must be 1 to 20');
      const optionKeys=Array.isArray(line.optionKeys)?[...new Set(line.optionKeys)]:[];
      if(optionKeys.some(key=>typeof key!=='string'||!item.optionKeys.includes(key)))throw new Error(`unsupported option for item ${item.id}`);
      const unitPrice=item.price+optionKeys.reduce((sum,key)=>sum+(OPTION_PRICES[key]||0),0);
      return {itemId:item.id,name:item.names[lang],quantity:line.quantity,optionKeys,unitPrice,lineTotal:unitPrice*line.quantity};
    });
    const createdAt=now(),expiresAt=createdAt+ttlMs,draftId=`D${String(++draftSeq).padStart(4,'0')}`,approvalToken=crypto.randomBytes(18).toString('base64url');
    const draft={draftId,requestId:body.requestId,status:'draft',restaurantId:'clover-ai-ordering-demo',table,menuVersion:MENU_VERSION,currency:CURRENCY,lines,total:lines.reduce((sum,line)=>sum+line.lineTotal,0),createdAt:new Date(createdAt).toISOString(),expiresAt:new Date(expiresAt).toISOString(),requiresHumanConfirmation:true,reviewUrl:`${baseUrl}/review?draft=${encodeURIComponent(draftId)}&token=${encodeURIComponent(approvalToken)}`};
    if(session)draft.sessionId=session.sessionId;
    Object.defineProperties(draft,{_approvalToken:{value:approvalToken,writable:false,enumerable:false},_expiresAt:{value:expiresAt,writable:false,enumerable:false}});drafts.set(draftId,draft);requests.set(body.requestId,draftId);
    if(session){session.status='awaiting_confirmation';session.draftId=draftId;session.total=draft.total;session.currency=CURRENCY;session.lines=clone(lines)}
    return clone(draft);
  }
  function getDraft(id){const draft=drafts.get(id);if(!draft)throw new Error('draft not found');return clone(draft)}
  function confirmDraft(id,token){
    const draft=drafts.get(id);if(!draft)throw new Error('draft not found');if(draft.status==='accepted')return clone(draft);if(now()>draft._expiresAt){draft.status='expired';if(draft.sessionId&&sessions.has(draft.sessionId))sessions.get(draft.sessionId).status='expired';throw new Error('draft expired')}if(token!==draft._approvalToken)throw new Error('invalid approval token');
    for(const line of draft.lines){const item=ITEMS.find(entry=>entry.id===line.itemId);if(!item||!item.available)throw new Error('menu item changed');const price=item.price+line.optionKeys.reduce((sum,key)=>sum+(OPTION_PRICES[key]||0),0);if(price!==line.unitPrice)throw new Error('price changed')}
    const orderId=`C${String(++orderSeq).padStart(4,'0')}`;draft.status='accepted';draft.requiresHumanConfirmation=false;draft.orderId=orderId;draft.acceptedAt=new Date(now()).toISOString();orders.set(orderId,{orderId,status:'準備中',table:draft.table,currency:CURRENCY,total:draft.total,lines:clone(draft.lines),acceptedAt:draft.acceptedAt});
    if(draft.sessionId&&sessions.has(draft.sessionId)){const session=sessions.get(draft.sessionId);session.status='accepted';session.orderId=orderId;session.orderStatus='準備中';session.acceptedAt=draft.acceptedAt}
    return clone(draft);
  }
  function getOrder(id){const order=orders.get(id);if(!order)throw new Error('order not found');return clone(order)}
  function listOrders(){return [...orders.values()].map(clone)}
  return {publicMenu,createSession,getSession,createDraft,getDraft,confirmDraft,getOrder,listOrders,menuVersion:MENU_VERSION};
}

module.exports={createAgentService,MENU_VERSION};
