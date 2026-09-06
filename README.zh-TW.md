# Clover AI 點餐系統

[English](README.md) | **繁體中文**

**Agent-to-Restaurant**：你的個人 AI 讀取公開菜單、建立點餐草稿，等你確認後才送出；餐廳不需要取得你的私人對話、長期偏好或付款資料。

## 核心概念

大多數 AI 點餐系統是「餐廳的 AI 服務你」。Clover 反過來：**你的 AI 代表你**。你告訴它偏好，它讀公開菜單，提出草稿；等你明確確認後，草稿才進入模擬餐廳訂單列表。

**私人偏好與對話留在客戶的 AI 裡。餐廳端只接收完成點餐所需的桌號、品項、選項與確認結果。**

## 跨 AI 流程

目前的 session 綁定流程如下：

1. 與餐廳系統分離的外部 AI 收到帶有本次 session 的 Agent URL
2. 外部 AI 呼叫 `GET /api/menu?lang=zh`，讀取完整菜單
3. 外部 AI 呼叫 `POST /api/drafts`，建立與該 session 綁定的草稿
4. 外部 AI 把品項與伺服器計算的金額回報給使用者
5. 草稿自動出現在原本的 Clover 點餐畫面，由使用者檢查並確認送出
6. 模擬餐廳訂單成立，原點餐畫面同步顯示訂單編號與狀態

**這證明具備網路存取與 HTTP/JSON 工具能力的外部 AI，可以在不取得付款資料或私人對話的情況下協助完成點餐草稿。**

## 功能

- **AI 可讀的 HTTP/JSON 服務** — 能存取公開網址並呼叫 HTTP/JSON 的個人 AI，可讀菜單、建草稿與查詢狀態
- **必須人工確認** — 草稿不等於訂單，只有客戶明確確認才送出
- **沉浸式點餐介面** — 呼吸粒子光球、氣泡選菜動畫、四語言支援（繁中 / 日文 / 英文 / 韓文）
- **氣閘架構** — 確認時重驗價格；不接受付款資訊、不接受個人資料
- **自動化驗證** — 核心點餐、Agent 氣閘、語音服務與前端邏輯測試皆通過

## 系統架構

```
客戶的個人 AI（Claude、GPT、Gemini……）
        │
        │  HTTP/JSON  ── 只讀公開菜單投影
        ▼
┌──────────────────────────────────────────────────┐
│  Clover Agent 服務（port 8765）                  │
│                                                  │
│  GET  /agent              AI 可讀入口頁面        │
│  GET  /api/menu?lang=     公開菜單 JSON          │
│  POST /api/drafts         建立點餐草稿           │
│  GET  /api/drafts/:id     查詢草稿狀態           │
│  GET  /api/orders/:id     查詢已確認訂單         │
│  POST /api/agent-sessions/:id/confirm            │
│                           原畫面人工確認          │
└──────────────────────────────────────────────────┘
        │
        │  客戶點選確認（原本點餐畫面）
        ▼
   模擬訂單成立  →  狀態：準備中
```

## 作品展示

- [線上展示：Clover AI 點餐系統](https://browsers-stephanie-although-mark.trycloudflare.com/?table=1&v=23)
- [評選影片：Clover AI Agent 點餐系統](https://youtube.com/shorts/EcsoLiQbS-c?si=tcKkxGN69DadQEf6)

## 快速開始

**環境需求：** Node.js 18 以上，無需 build，無需安裝額外套件

```bash
git clone https://github.com/CloverAI-Family/clover-ai-ordering.git
cd clover-ai-ordering
node server.cjs
# → Clover preview: http://127.0.0.1:8765
```

開啟瀏覽器：`http://127.0.0.1:8765`

含桌號與語言：`http://127.0.0.1:8765/?restaurant=clover-demo&table=1&lang=zh`

## API 文件（給個人 AI 使用）

所有端點均為 HTTP/JSON。讀取操作不需驗證。

### 1. 入口頁面（AI 可讀說明）

```
GET /agent?restaurant=clover-demo&table=1&lang=zh
```

回傳結構化 HTML 頁面，說明所有 API 操作與 JSON 格式——人類與 AI 都能讀懂。

---

### 2. 讀取菜單

```
GET /api/menu?lang=zh
```

支援語言：`zh` / `ja` / `en` / `ko`

**回傳：**
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

### 3. 建立草稿

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

**回傳欄位：**
- `draftId` — 草稿編號，例如 `D0003`
- `lines` — 品項明細，含**伺服器計算**的價格（AI 不能自行設定價格）
- `total` — 合計金額（TWD）
- `expiresAt` — 15 分鐘有效期
- `confirmationMode: "originating_session"` — 草稿回到原本的 Clover 畫面確認
- `requiresHumanConfirmation: true` — 永遠為 true

若省略 `sessionId`，API 會建立獨立的相容草稿，回傳 `confirmationMode: "review_url"` 與備援 `reviewUrl`。

相同 `requestId` 重試會回傳同一份草稿，不會重複建立。

---

### 4. 查詢草稿

```
GET /api/drafts/:draftId
```

回傳目前狀態：`draft`（草稿）/ `accepted`（已確認）/ `expired`（已過期）

---

### 5. 查詢訂單（客戶確認後）

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

## 人工確認流程

AI 不能直接確認訂單。流程如下：

1. 瀏覽器建立 session，並保存只供該瀏覽器使用的確認憑證
2. AI 建立綁定 `sessionId` 的草稿；AI 不會取得確認網址
3. 原本的 Clover 畫面顯示品項、數量、價格與合計
4. 客戶直接在該畫面點選 **「確認訂單」**
5. 伺服器重驗：菜單版本、價格、供應狀態、有效期、防重複送出
6. 訂單成立，取得 `orderId`，狀態為 `準備中`
7. 原本點餐畫面顯示已接受的訂單編號與狀態

## 示範安全邊界

| AI 可以做的 | AI 不能做的 |
|------------|------------|
| 讀取公開菜單投影 | 設定或修改價格 |
| 建立點餐草稿 | 確認訂單 |
| 依已取得的編號查詢草稿與訂單狀態 | 代表使用者確認訂單 |
| 把客戶偏好傳給餐廳 | 提交付款、地址或個人資料 |

- **不接受個人資料**：不接受信用卡、付款憑證、地址、電話或 AI 對話記錄
- **冪等性**：相同 `requestId` 回傳相同草稿，不重複建立
- **15 分鐘草稿有效期**，session 訂單使用只存在原瀏覽器、HttpOnly 的確認憑證
- **確認時重驗價格** — 草稿建立到確認之間若價格變動，直接拒絕

> 這是 Hackathon 示範系統，不具備正式帳號、租戶隔離或生產環境存取控制，不應接收真實顧客或付款資料。

## 執行測試

```bash
node tests/ordering-core.test.cjs
node tests/agent-service.test.cjs
node tests/speech-service.test.cjs
node tests/frontend.test.cjs
```

四組自動化測試皆通過；其中前端邏輯與靜態檢查共 295 項。涵蓋點餐規則、API 合約、防重複送出、過期草稿拒絕、無效選項拒絕與價格完整性。瀏覽器及手機畫面另以實機流程驗收。

## 技術架構

| 層次 | 技術 |
|------|------|
| 執行環境 | Node.js 18+，零 npm 依賴 |
| 前端 | 原生 HTML + CSS + JS |
| 後端 | Node.js `http` 模組，port 8765 |
| 多語言 | 四語言：繁中 / 日文 / 英文 / 韓文 |
| 測試 | 原生 Node.js 測試；前端邏輯與靜態檢查 295 項 |

## WSL2 連接 Windows 伺服器（跨 AI 示範用）

如果 AI 執行在 WSL2、伺服器跑在 Windows，用 PowerShell 當橋樑：

```powershell
powershell.exe -NoProfile -Command `
  "(Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:8765/api/menu?lang=zh').Content"
```

POST 請求：
```powershell
powershell.exe -NoProfile -Command `
  "(Invoke-WebRequest -UseBasicParsing -Method POST -Uri 'http://127.0.0.1:8765/api/drafts' -Body '<json>' -ContentType 'application/json').Content"
```

## 本 MVP 未包含

- 實際可掃描的 QR Code（需確認依賴套件）
- MCP 適配器（未來計畫，核心 HTTP/JSON 不變）
- 可自由輸入的文字點餐與穩定的語音轉文字；目前以泡泡操作為主要互動
- ElevenLabs 正式語音服務；程式介面已預留，但本次展示未啟用或使用其額度
- 生產環境驗證、正式帳號權限與持久公開部署；手機錄影僅使用臨時 Demo 通道
- 真實廚房、POS 或付款連接

## 外部服務與素材

- 本機執行不需要外部服務或 npm 套件。
- 手機錄影與跨網路測試使用臨時 Cloudflare Quick Tunnel；它不是正式部署，也不是應用程式執行依賴。
- 餐點圖片與家徽為本專案製作的 AI 輔助原創素材，未使用私人照片。
- 本次展示未使用 Sponsor 技術。

## 授權

MIT
