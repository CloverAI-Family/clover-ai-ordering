const assert = require('node:assert/strict');
const {createSpeechService} = require('../speech-service.cjs');

(async()=>{
  await assert.rejects(()=>createSpeechService({apiKey:'',voiceId:''}).generate({text:'您好',language:'zh'}),error=>error.status===503);
  await assert.rejects(()=>createSpeechService({apiKey:'x',voiceId:'voice',fetchImpl:async()=>{throw Error('must not call')}}).generate({text:'',language:'zh'}),error=>error.status===400);
  await assert.rejects(()=>createSpeechService({apiKey:'x',voiceId:'voice',fetchImpl:async()=>{throw Error('must not call')}}).generate({text:'字'.repeat(301),language:'zh'}),error=>error.status===400);

  let calls=0,received;
  const fakeFetch=async(url,options)=>{calls++;received={url,options};return {ok:true,headers:{get:()=> 'audio/mpeg'},arrayBuffer:async()=>Uint8Array.from([1,2,3,4]).buffer}};
  const service=createSpeechService({apiKey:'secret-test-key',voiceId:'voice/demo',modelId:'demo-model',fetchImpl:fakeFetch});
  const first=await service.generate({text:'訂單已確認',language:'zh'}),second=await service.generate({text:'訂單已確認',language:'zh'});
  assert.equal(calls,1);assert.equal(first.audio.length,4);assert.equal(first.cached,false);assert.equal(second.cached,true);
  assert.match(received.url,/voice%2Fdemo\/stream/);assert.equal(received.options.headers['xi-api-key'],'secret-test-key');
  assert.deepEqual(JSON.parse(received.options.body),{text:'訂單已確認',model_id:'demo-model'});

  const rejected=createSpeechService({apiKey:'x',voiceId:'voice',fetchImpl:async()=>({ok:false})});
  await assert.rejects(()=>rejected.generate({text:'您好',language:'zh'}),error=>error.status===502);
  console.log('PASS: ElevenLabs speech service tests');
})().catch(error=>{console.error(error);process.exitCode=1});
