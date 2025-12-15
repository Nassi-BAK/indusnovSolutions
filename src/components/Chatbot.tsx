import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

// Définition des services
interface ServiceItem {
  id: string;
  title: string;
  definition: string;
  shortDesc: string;
  fullDesc: string;
  objectives: string[];
  benefits: string[];
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: 'drontech',
    title: 'DronTech',
    definition: 'Inspection aérienne par drones pour vos installations industrielles.',
    shortDesc: 'Inspection par drone.',
    fullDesc: 'DronTech fournit des inspections complètes par drone pour vos installations industrielles et bâtiments. Les drones capturent des images haute résolution et fournissent des rapports détaillés pour faciliter la maintenance et la sécurité.',
    objectives: ['Inspection rapide', 'Détection précoce des problèmes', 'Optimisation de la maintenance'],
    benefits: ['Gain de temps', 'Réduction des coûts', 'Sécurité renforcée'],
    features: ['Rapide', 'Précis', 'Sécurité améliorée'],
  },
  {
    id: 'aquascope',
    title: 'AquaScope',
    definition: 'Inspection sous-marine pour infrastructures portuaires et aquatiques.',
    shortDesc: 'Inspection sous-marine.',
    fullDesc: 'AquaScope réalise des inspections sous-marines détaillées pour les infrastructures portuaires et installations aquatiques. Nos équipements permettent un contrôle précis même dans les zones difficiles d\'accès.',
    objectives: ['Surveillance sous-marine', 'Détection de fuites ou corrosion', 'Maintenance proactive'],
    benefits: ['Prévention des accidents', 'Optimisation des interventions', 'Rapports détaillés'],
    features: ['Haute résolution', 'Adapté aux profondeurs', 'Rapport détaillé'],
  },
  {
    id: 'ecoscan',
    title: 'EcoScan',
    definition: 'Audit énergétique pour entreprises et bâtiments.',
    shortDesc: 'Audit énergétique.',
    fullDesc: 'EcoScan propose des audits énergétiques pour entreprises et bâtiments. Nous analysons vos consommations, identifions les pertes et recommandons des solutions d\'optimisation énergétique.',
    objectives: ['Réduction de consommation', 'Optimisation des installations', 'Amélioration de l\'efficacité'],
    benefits: ['Économies d\'énergie', 'Impact environnemental réduit', 'Rapport détaillé avec recommandations'],
    features: ['Économie d\'énergie', 'Analyse complète', 'Recommandations pratiques'],
  },
  {
    id: 'predictech',
    title: 'PredicTech',
    definition: 'Maintenance prédictive grâce à capteurs et IA.',
    shortDesc: 'Maintenance prédictive.',
    fullDesc: 'PredicTech surveille vos machines et équipements industriels grâce à des capteurs intelligents et l\'IA pour prévenir toute panne ou défaillance. Les interventions sont planifiées avant tout incident.',
    objectives: ['Surveillance continue', 'Prévention des pannes', 'Optimisation du cycle de vie des machines'],
    benefits: ['Réduction des temps d\'arrêt', 'Efficacité accrue', 'Alertes automatiques'],
    features: ['Prévention des pannes', 'Optimisation des performances', 'Alertes automatiques'],
  },
  {
    id: 'skillnov',
    title: 'SkilNov',
    definition: 'Formation technique et certifications professionnelles.',
    shortDesc: 'Formation technique.',
    fullDesc: 'SkilNov offre des formations techniques et certifications professionnelles pour vos employés. Nos programmes sont adaptés aux besoins spécifiques de chaque secteur industriel.',
    objectives: ['Formation pratique', 'Certification reconnue', 'Développement des compétences'],
    benefits: ['Employés qualifiés', 'Amélioration de la productivité', 'Montée en compétence rapide'],
    features: ['Formateurs experts', 'Cours pratiques', 'Certifications reconnues'],
  },
  {
    id: 'smartflow',
    title: 'SmartFlow',
    definition: 'Optimisation des processus industriels grâce à l’automatisation.',
    shortDesc: 'Automatisation industrielle.',
    fullDesc: 'SmartFlow optimise vos processus industriels grâce à l\'automatisation intelligente. Nos solutions permettent de réduire les erreurs, améliorer la qualité et suivre les performances en temps réel.',
    objectives: ['Automatisation des processus', 'Contrôle qualité', 'Suivi en temps réel'],
    benefits: ['Efficacité accrue', 'Réduction des erreurs', 'Gain de temps'],
    features: ['Efficacité accrue', 'Réduction des erreurs', 'Suivi en temps réel'],
  },
];

// Mapping des services pour le bot
const serviceFAQ = services.map(s => ({
  keywords: [s.title.toLowerCase(), s.shortDesc.toLowerCase(), s.id],
  answer: `💡 ${s.title}:\nDéfinition: ${s.definition}\n\nDescription: ${s.fullDesc}\n🎯 Objectifs: ${s.objectives.join(', ')}\n✨ Avantages: ${s.benefits.join(', ')}\n⚡ Caractéristiques: ${s.features.join(', ')}`,
}));

// FAQ générale
const generalFAQ = [
  { keywords: ['bonjour', 'salut'], answer: 'Bonjour ! Je suis le chatbot d\'Indusnov. Posez-moi vos questions sur nos services.' },
  { keywords: ['merci', 'ok'], answer: 'Avec plaisir ! Si vous voulez en savoir plus sur nos services, tapez le nom du service.' },
];

const getBotReply = (text: string) => {
  const lowerText = text.toLowerCase();

  for (const item of serviceFAQ) {
    for (const keyword of item.keywords) {
      if (lowerText.includes(keyword)) return item.answer;
    }
  }

  for (const item of generalFAQ) {
    for (const keyword of item.keywords) {
      if (lowerText.includes(keyword)) return item.answer;
    }
  }

  return "Désolé, je n'ai pas compris. Vous pouvez me poser une question sur nos services ou votre projet.";
};

// Composant Chatbot
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: number; text: string; isBot: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: Date.now(), text: 'Bonjour ! Je suis le chatbot d\'Indusnov. Comment puis-je vous aider ?', isBot: true }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    const botReply = getBotReply(inputValue);
    setMessages(prev => [...prev, { id: Date.now() + 1, text: botReply, isBot: true }]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Bouton du chatbot */}
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

      {/* Fenêtre du chatbot */}
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
