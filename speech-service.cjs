const DEFAULT_MODEL = 'eleven_multilingual_v2';
const SUPPORTED_LANGUAGES = new Set(['zh', 'ja', 'en', 'ko']);

function serviceError(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function createSpeechService(options = {}) {
  const apiKey = options.apiKey ?? process.env.ELEVENLABS_API_KEY;
  const voiceId = options.voiceId ?? process.env.ELEVENLABS_VOICE_ID;
  const modelId = options.modelId ?? process.env.ELEVENLABS_MODEL_ID ?? DEFAULT_MODEL;
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const cache = new Map();

  async function generate(input = {}) {
    const text = typeof input.text === 'string' ? input.text.trim() : '';
    const language = SUPPORTED_LANGUAGES.has(input.language) ? input.language : 'zh';
    if (!text) throw serviceError('speech text is required');
    if ([...text].length > 300) throw serviceError('speech text is too long');
    if (!apiKey || !voiceId || typeof fetchImpl !== 'function') throw serviceError('speech service is not configured', 503);

    const cacheKey = `${voiceId}\n${modelId}\n${language}\n${text}`;
    if (cache.has(cacheKey)) return {...cache.get(cacheKey), cached: true};

    let upstream;
    try {
      upstream = await fetchImpl(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}/stream?output_format=mp3_44100_128`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'xi-api-key': apiKey},
        body: JSON.stringify({text, model_id: modelId}),
        signal: AbortSignal.timeout(15000)
      });
    } catch {
      throw serviceError('speech provider is unavailable', 502);
    }
    if (!upstream.ok) throw serviceError('speech provider rejected the request', 502);
    const audio = Buffer.from(await upstream.arrayBuffer());
    if (!audio.length) throw serviceError('speech provider returned empty audio', 502);
    const value = {audio, contentType: upstream.headers.get('content-type') || 'audio/mpeg'};
    if (cache.size >= 32) cache.delete(cache.keys().next().value);
    cache.set(cacheKey, value);
    return {...value, cached: false};
  }

  return {generate};
}

module.exports = {createSpeechService};
