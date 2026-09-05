# Clover AI Ordering

**English** | [繁體中文](README.zh-TW.md)

**Agent-to-Restaurant**: Your personal AI reads the public menu, creates an order draft, and waits for your confirmation. The restaurant does not need your private conversation, long-term preference profile, or payment data.

## The Idea

Most AI ordering systems put the restaurant's AI in front of you. Clover flips it: *your* AI acts on your behalf. You give it your preferences, it reads the public menu and proposes an order draft. Only after *you* explicitly approve does that draft enter the simulated restaurant order list.

**Private preferences and conversations stay with the customer's AI. The restaurant side receives only the table, items, options, and confirmation result required for the order.**

## Cross-AI Flow

The session-bound flow is:

1. An external AI, separate from the restaurant system, received a session-bound Agent URL
2. The external AI called `GET /api/menu?lang=zh` and read the full menu
3. It called `POST /api/drafts` and created a draft bound to that session
4. It reported the items and server-calculated total to the user
5. The draft appeared on the original Clover ordering screen, where the user reviewed and confirmed it
6. The simulated restaurant order was created, and the original ordering screen displayed the order number and status

**This demonstrates that an external AI with network access and HTTP/JSON tools can help create an order draft without receiving payment data or the user's private conversation.**

## Features

- **Agent-readable HTTP/JSON service** — a personal AI that can access the public URL and call HTTP/JSON endpoints can read the menu, propose a draft, and query status
- **Human confirmation required** — drafts are not orders; only an explicit human action confirms
- **Immersive ordering UI** — breathing particle orb, bubble dish selection, four-language support (zh / ja / en / ko)
- **Airlock architecture** — prices revalidated at confirmation; no payment, no personal data in scope
- **Automated verification** — ordering core, Agent airlock, speech service, and frontend logic test suites pass

## System Architecture

```
Customer's Personal AI (e.g., Claude, GPT, Gemini)
        │
        │  HTTP/JSON  ── public menu projection only
        ▼
┌──────────────────────────────────────────────────┐
│  Clover Agent Service  (port 8765)               │
│                                                  │
│  GET  /agent              AI-readable entry page │
│  GET  /api/menu?lang=     public menu JSON       │
│  POST /api/drafts         create order draft     │
│  GET  /api/drafts/:id     query draft status     │
│  GET  /api/orders/:id     query confirmed order  │
│  POST /api/agent-sessions/:id/confirm            │
│                           same-screen confirmation│
└──────────────────────────────────────────────────┘
        │
        │  Human taps confirm (original screen)
        ▼
   Simulated order accepted  →  status: "準備中"
```

## Demo

- [Evaluation video: Clover AI Agent Ordering (1 min 35 sec)](https://www.youtube.com/watch?v=CUQ6OsLht7c)

## Quick Start

**Requirements:** Node.js 18+, no build step, no dependencies to install

```bash
git clone https://github.com/CloverAI-Family/clover-ai-ordering.git
cd clover-ai-ordering
node server.cjs
# → Clover preview: http://127.0.0.1:8765
```

Open in browser: `http://127.0.0.1:8765`

With table context: `http://127.0.0.1:8765/?restaurant=clover-demo&table=1&lang=zh`

## API Reference for AI Agents

All endpoints are HTTP/JSON. No authentication required for read operations.

### 1. Entry Point (AI-readable guide)

```
GET /agent?restaurant=clover-demo&table=1&lang=zh
```

Returns a structured HTML page explaining the API — readable by both humans and AI agents.

---

### 2. Read Menu

```
GET /api/menu?lang=zh
```

Supported languages: `zh` / `ja` / `en` / `ko`

**Response:**
```json
{
  "restaurantId": "clover-ai-ordering-demo",
  "menuVersion": "2026-09-05-v1",
  "currency": "TWD",
  "items": [
    {
      "id": 5,
      "category": "main",
      "name": "蘿蔔糕",
      "price": 35,
      "available": true,
      "optionKeys": ["eggAdd"]
    }
  ]
}
```

---

### 3. Create Draft

```
POST /api/drafts
Content-Type: application/json
```

```json
{
  "requestId": "my-agent-session-001",
  "menuVersion": "2026-09-05-v1",
  "table": "1",
  "language": "zh",
  "sessionId": "S_...",
  "lines": [
    { "itemId": 5, "quantity": 1, "optionKeys": [] },
    { "itemId": 6, "quantity": 1, "optionKeys": ["sugar0", "iceNone"] }
  ]
}
```

**Response includes:**
- `draftId` — e.g. `D0003`
- `lines` — itemized with **server-calculated** prices (agent cannot set prices)
- `total` — in TWD
- `expiresAt` — 15-minute TTL from creation
- `confirmationMode: "originating_session"` — the draft returns to the original Clover screen for confirmation
- `requiresHumanConfirmation: true` — always present

If `sessionId` is omitted, the API creates a standalone compatibility draft with `confirmationMode: "review_url"` and a `reviewUrl` fallback.

Same `requestId` returns the same draft — no duplicate drafts on retry.

---

### 4. Query Draft

```
GET /api/drafts/:draftId
```

Returns current status: `draft` / `accepted` / `expired`

---

### 5. Query Order (after human confirms)

```
GET /api/orders/:orderId
```

```json
{
  "orderId": "C0001",
  "status": "準備中",
  "table": "1",
  "total": 50,
  "currency": "TWD",
  "lines": [ ... ],
  "acceptedAt": "2026-09-05T12:11:00.000Z"
}
```

## Human Confirmation Flow

The AI never confirms an order directly. The flow is:

1. The browser creates a session and keeps a browser-only confirmation credential
2. AI creates a draft bound to that `sessionId`; no confirmation URL is exposed to the AI
3. The original Clover screen displays items, quantities, prices, and total
4. Human taps **Confirm order** on that screen
5. Server revalidates: menu version, prices, availability, expiry, replay protection
6. Order created with `orderId` and status `準備中`
7. The original screen displays the accepted order number and status

## Demonstration Security Boundaries

| What the agent can do | What the agent cannot do |
|----------------------|--------------------------|
| Read public menu projection | Set or modify prices |
| Create an order draft | Confirm an order |
| Query a draft or order by an identifier already received | Confirm an order on the user's behalf |
| Pass preferences to the restaurant | Submit payment, address, or personal data |

- **No personal data accepted**: no card, payment token, address, phone, or AI conversation history
- **Idempotency**: same `requestId` → same draft, no duplicates
- **15-minute draft TTL** with a browser-only, HttpOnly confirmation credential for session-bound orders
- **Price revalidated at confirmation** — price changes between draft and confirm are rejected

> This is a hackathon demonstration. It does not provide production authentication, tenant isolation, or production access control, and must not receive real customer or payment data.

## Run Tests

```bash
node tests/ordering-core.test.cjs
node tests/agent-service.test.cjs
node tests/speech-service.test.cjs
node tests/frontend.test.cjs
```

All four automated test suites pass. The frontend logic and static suite contains 295 assertions. Coverage includes ordering rules, the API contract, duplicate-submit protection, expired draft rejection, invalid option rejection, and price integrity. Browser and mobile views were also checked through a real-device flow.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+, zero npm dependencies |
| Frontend | Vanilla HTML + CSS + JS |
| Backend | Node.js `http` module, port 8765 |
| i18n | Four languages: zh / ja / en / ko |
| Tests | Plain Node.js tests; 295 frontend logic and static assertions |

## WSL2 → Windows Bridge (for cross-AI demo)

If your AI runs in WSL2 and the server runs on Windows, use PowerShell as a bridge:

```powershell
powershell.exe -NoProfile -Command `
  "(Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:8765/api/menu?lang=zh').Content"
```

For POST requests:
```powershell
powershell.exe -NoProfile -Command `
  "(Invoke-WebRequest -UseBasicParsing -Method POST -Uri 'http://127.0.0.1:8765/api/drafts' -Body '<json>' -ContentType 'application/json').Content"
```

## What's Not in this MVP

- Real QR code (requires dependency approval)
- MCP adapter (future — same HTTP/JSON core, different transport)
- Free-form text ordering and reliable speech-to-text; bubble controls are the primary interaction in this demo
- Production ElevenLabs speech; the adapter is prepared, but the submitted demo does not enable it or consume its credits
- Production authentication, account permissions, and persistent public deployment; mobile recording uses a temporary demo tunnel only
- Real kitchen, POS, or payment connection

## External Services and Assets

- Local execution requires no external service or npm package.
- Mobile recording and cross-network testing use a temporary Cloudflare Quick Tunnel. It is not a production deployment or an application runtime dependency.
- Dish images and the clover emblem are AI-assisted original assets created for this project; no private photographs are included.
- The submitted demonstration does not use sponsor technology.

## License

MIT
