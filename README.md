# 🤖 Panduan Instalasi AI Chatbot Kit (Plug & Play)

Halo! Ini adalah modul Chatbot AI yang bisa Anda pasang di website React/Lovable Anda sendiri. Ikuti langkah-langkah mudah di bawah ini:

### 1. Salin Folder
Copy (Salin) seluruh folder `chatbot-kit` ini ke dalam folder `src/` di proyek Anda.

### 2. Instal Library Pendukung
Buka terminal di proyek Anda, lalu jalankan perintah ini (Copy-Paste saja):
```bash

pnpm add framer-motion lucide-react

```

### 3. Instal Komponen UI (Shadcn)
Chatbot ini butuh 3 komponen dasar. Jalankan perintah ini di terminal:
```bash

pnpm dlx shadcn@latest add button input scroll-area

```
*(Jika ditanya 'proceed?', ketik `y` lalu Enter)*

> [!TIP]
> **Mengatasi Error 'bun is not recognized'**:
> Jika Anda mendapat error saat instalasi (seperti menyebutkan `bun`), hapus file `bun.lockb` atau `package-lock.json` di root folder proyek Anda. Shadcn terkadang bingung jika ada banyak file lock. Pastikan hanya ada `pnpm-lock.yaml` jika Anda menggunakan pnpm.


### 4. Seting API Key (Penting!)
1. Buka file `.env` di proyek Anda. Jika tidak ada maka buat sendiri file .env
2. Tambahkan baris ini di paling bawah:
   ```env
   VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxx
   ```
   *Ganti `gsk_...` dengan kunci API Groq Anda (Dapatkan gratis di console.groq.com)*

### 5. Pasang Chatbot di Website
Buka file `App.tsx` (atau file halaman utama Anda), lalu panggil chatbot-nya seperti ini:

```tsx
import ChatButton from "./chatbot-kit/ChatButton"; // Sesuaikan path jika perlu

function App() {
  return (
    <div>
      {/* Konten website Anda lainnya... */}
      
      {/* Munculkan Tombol Chatbot di sini */}
      <ChatButton />
    </div>
  );
}
```

kadang menaruh <chatbutton/> disini:


```tsx
import ChatButton from "./chatbot-kit/ChatButton"; // Sesuaikan path jika perlu

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChatButton />
    ...
  </QueryClientProvider>
);
```

### 6. Kustomisasi (Opsional)
- **Ganti Data**: Edit file `knowledge.txt` dengan informasi sekolah/toko Anda.
- **Ganti Nama AI**: Edit bagian paling atas file `ai.ts` untuk mengganti Nama AI atau Link WhatsApp.

Selamat mencoba! Semoga chatbot ini membantu pengunjung website Anda! 🚀
