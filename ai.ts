// @ts-ignore
import knowledgeBase from "./knowledge.txt?raw";

// --- KONFIGURASI CHATBOT ---
// Ganti data di bawah ini sesuai kebutuhan sekolah Anda
export const CHATBOT_CONFIG = {
  NAME: "Irsyad Asisten AI",
  INSTITUTION: "Sekolah Al Irsyad",
  WELCOME_MESSAGE: "Assalamu'alaikum! 👋 Perkenalkan, saya Irsyad Asisten AI Anda. Ada yang bisa saya bantu terkait informasi sekolah?",
  WHATSAPP_LINK: "https://wa.me/628123456789", // Ganti dengan nomor WhatsApp sekolah
  REGISTRATION_LINK: "https://docs.google.com/forms/...", // Ganti dengan link pendaftaran
  LOGO_URL: "/LogoYiss.png", // Ganti dengan path logo Anda
  MODEL: "llama-3.3-70b-versatile",
};
// ---------------------------

const API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

const systemPrompt = `Anda adalah ${CHATBOT_CONFIG.NAME} ${CHATBOT_CONFIG.INSTITUTION}.
Tugas Anda adalah membantu calon siswa dan orang tua dengan informasi sekolah berdasarkan data berikut:

${knowledgeBase}

ATURAN PENTING:
1. Ramah, sopan, dan bernuansa Islami.
2. JANGAN memulai setiap jawaban dengan "Assalamu'alaikum" atau salam — salam sudah diucapkan di awal percakapan. Langsung jawab pertanyaan.
3. Jawab HANYA berdasarkan data yang diberikan di atas.
4. Jika pertanyaan di luar data, arahkan ke WhatsApp atau admin sekolah.
5. Jawab dalam Bahasa Indonesia yang baik dan mudah dipahami.
6. Gunakan baris baru (newline) dan list (poin-poin) agar jawaban rapi dan mudah dibaca.
7. Jaga jawaban tetap singkat namun informatif.
8. jika ditanya tentang siapa yang membuat maka jawab amysidra`;

export const getAIResponse = async (userMessage: string, history: any[]) => {
  if (!API_KEY) {
    return "Layanan AI belum dikonfigurasi. Silakan seting API KEY di .env";
  }

  try {
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((h) => ({
        role: h.role === "assistant" ? "assistant" : "user",
        content: h.content,
      })),
      { role: "user", content: userMessage },
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: CHATBOT_CONFIG.MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API Error:", data);
      return "Maaf, asisten sedang sibuk. Silakan coba beberapa saat lagi atau hubungi via WhatsApp.";
    }

    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content;
    }

    return "Maaf, silakan coba tanya sekali lagi.";

  } catch (error: any) {
    console.error("Network Exception:", error);
    return "Koneksi gagal. Silakan cek internet Anda.";
  }
};
