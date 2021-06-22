import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import De from './de';
import En from './en';

i18n.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		fallbackLng: 'en',
		resources: {
			en: En,
			de: De,
		},
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
