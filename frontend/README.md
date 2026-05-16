# NexusChat Frontend

A premium, dark futuristic realtime chat application built with **Next.js 14 App Router**, **Tailwind CSS**, **Framer Motion**, **Socket.io Client**, and **Axios**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Strapi backend running on `http://localhost:1337`
- Socket.io server running on `http://localhost:5000`

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── login/page.jsx          # Login page
│   │   ├── register/page.jsx       # Register page
│   │   ├── chat/page.jsx           # Main chat page
│   │   ├── globals.css             # Global styles & CSS variables
│   │   ├── layout.jsx              # Root layout with providers
│   │   └── page.jsx                # Root redirect page
│   │
│   ├── components/
│   │   ├── auth/                   # Auth-related components
│   │   ├── chat/
│   │   │   ├── RoomModal.jsx       # Room selection modal
│   │   │   ├── Sidebar.jsx         # Active users sidebar
│   │   │   ├── ChatHeader.jsx      # Chat top bar
│   │   │   ├── MessageList.jsx     # Message list with grouping
│   │   │   └── MessageInput.jsx    # Message composer
│   │   └── ui/
│   │       ├── GlassCard.jsx       # Glass card, avatar, spinner
│   │       ├── Button.jsx          # Button component
│   │       └── Input.jsx           # Input component
│   │
│   ├── lib/
│   │   ├── api.js                  # Axios + Strapi API helpers
│   │   └── socket.js               # Socket.io client helpers
│   │
│   └── context/
│       └── AuthContext.jsx         # Auth state & actions
│
└── public/
```

---

## ⚙️ Configuration

Update backend URLs in:

- `src/lib/api.js` → `STRAPI_URL = 'http://localhost:1337'`
- `src/lib/socket.js` → `SOCKET_URL = 'http://localhost:5000'`

---

## 🔌 Strapi Setup

### Required Collection: `messages`

| Field    | Type   |
|----------|--------|
| text     | Text   |
| username | Text   |
| room     | Text   |

### Auth Endpoints Used
- `POST /api/auth/local` — login
- `POST /api/auth/local/register` — register

---

## 🔌 Socket.io Events

| Event            | Direction        | Payload                          |
|------------------|------------------|----------------------------------|
| `join_room`      | client → server  | `{ room, username }`             |
| `send_message`   | client → server  | `{ room, username, text }`       |
| `receive_message`| server → client  | `{ room, username, text, createdAt }` |
| `active_users`   | server → client  | `string[]` (array of usernames)  |

---

## 🎨 Design System

- **Theme**: Deep void dark (navy/indigo/purple)
- **Fonts**: Syne (display), DM Sans (body), JetBrains Mono (code)
- **Effects**: Glassmorphism, animated gradient glows, backdrop blur
- **Animations**: Framer Motion spring physics + CSS keyframes
- **Components**: Glassmorphic cards, gradient buttons, custom scrollbar

---

## 🏗️ Build

```bash
npm run build
npm start
```
