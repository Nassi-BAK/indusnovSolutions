import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

// FAQ avec plus de détails pour Indusnov et Indusnov Solutions
const faq = [
  { keywords: ["bonjour", "salut", "hello"], answer: "Bonjour ! Je suis le chatbot d'Indusnov. Comment puis-je vous aider ?" },
  { keywords: ["horaires", "ouvert", "fermé"], answer: "Nos horaires sont de 9h à 18h, du lundi au vendredi." },
  { keywords: ["adresse", "lieu"], answer: "Nous sommes situés à Technopark, Casablanca, Maroc." },
  { keywords: ["services", "service"], answer: "Nous offrons développement web, marketing digital, consulting, et solutions industrielles." },
  { keywords: ["contact", "email", "téléphone"], answer: "Vous pouvez nous contacter au +212 661-185357 ou contact@indusnov.com" },
  { keywords: ["indusnov"], answer: "Indusnov est une société spécialisée dans les solutions industrielles et le développement de projets innovants." },
  { keywords: ["indusnov solution"], answer: "Indusnov Solutions propose des services dans l'industrie, l'automatisation, la transformation digitale et le marketing." },
  { keywords: ["industriel", "industrie"], answer: "Nous proposons des solutions industrielles complètes: automatisation, consulting, gestion de projets et services techniques." },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: Date.now(), text: "Bonjour ! Je suis le chatbot d'Indusnov. Comment puis-je vous aider ?", isBot: true }
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotReply = (text: string) => {
    const lowerText = text.toLowerCase();
    for (const item of faq) {
      for (const keyword of item.keywords) {
        if (lowerText.includes(keyword)) {
          return item.answer;
        }
      }
    }
    return "Merci, nous avons reçu votre message !"; // réponse par défaut
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { id: Date.now(), text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage: Message = { id: Date.now() + 1, text: getBotReply(inputValue), isBot: true };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Bouton toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 end-6 z-50 w-80 sm:w-96 overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="bg-blue-600 p-4 text-white flex items-center gap-3">
              <MessageCircle className="h-5 w-5" />
              <h4 className="font-bold">Indusnov Chatbot</h4>
            </div>

            <div className="h-72 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.isBot ? 'bg-gray-200 text-gray-900' : 'bg-blue-600 text-white'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-gray-300 p-4 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button onClick={handleSend} className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
