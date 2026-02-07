"use client";

import { useLanguage } from '@/app/contexts/LanguageContext';
// import { Globe } from 'lucide-react'; // Removed static icon
import { motion } from 'framer-motion';
import LordIcon from './ui/LordIcon';
import { LORDICON_ICONS } from '@/lib/lordicon-icons';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-card/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-2 shadow-lg">
            <LordIcon
                src={LORDICON_ICONS.GLOBE}
                trigger="hover"
                size={20}
                colors={{ primary: "#10b981", secondary: "#10b981" }}
            />
            <button
                onClick={() => setLanguage('pt')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${language === 'pt'
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-white'
                    }`}
            >
                PT
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${language === 'en'
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-white'
                    }`}
            >
                EN
            </button>
        </div>
    );
}
