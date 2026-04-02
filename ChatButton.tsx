import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import ChatWindow from "./ChatWindow"; // Import relatif
import { CHATBOT_CONFIG } from "./ai"; // Import relatif

const ChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4"
          >
            <ChatWindow onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? "bg-red-500 hover:bg-red-600 font-sans" : "bg-white hover:bg-gray-50 border border-gray-100"
        } group`}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
             <img 
              src={CHATBOT_CONFIG.LOGO_URL} 
              alt="Logo" 
              className="w-full h-full object-contain group-hover:rotate-12 transition-transform"
              onError={(e) => {
                // Fallback to Icon if image not found
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('svg')?.classList.remove('hidden');
              }}
            />
          )}
          {!isOpen && <MessageCircle className="w-6 h-6 text-[#0c4a6e] hidden" />} 
        </div>

        {!isOpen && (
          <span className="whitespace-nowrap font-medium text-[#0c4a6e]">
            Tanya {CHATBOT_CONFIG.NAME.split(' ')[0]}
          </span>
        )}
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default ChatButton;
