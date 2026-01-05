"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { en, Translations } from "@/locales/en";
import { zh } from "@/locales/zh";

type Language = "en" | "zh";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = "todo-app-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [language, setLanguageState] = useState<Language>("en");
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem(LANGUAGE_KEY);
		if (saved === "zh" || saved === "en") {
			setLanguageState(saved);
		} else {
			// Simple auto-detect
			const browserLang = navigator.language.toLowerCase();
			if (browserLang.includes("zh")) {
				setLanguageState("zh");
			}
		}
		setIsLoaded(true);
	}, []);

	const setLanguage = (lang: Language) => {
		setLanguageState(lang);
		localStorage.setItem(LANGUAGE_KEY, lang);
	};

	const t = language === "zh" ? zh : en;

	if (!isLoaded) {
		return null;
	}

	return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useTranslation must be used within a LanguageProvider");
	}
	return context;
}
