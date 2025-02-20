import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frYaml from 'js-yaml-loader!../../../translations/messages.fr.yaml';

i18n
    .use(initReactI18next)
    .init({
        returnNull: false,
        resources: {
            fr: {
                translation: frYaml,
            },
        },
        lng: (window && window.locale) || 'fr',
        fallbackLng: 'fr',
    });

export default i18n;
