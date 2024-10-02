import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../components/language-utils/en.json";
import rus from "../../components/language-utils/rus.json";
import heb from "../../components/language-utils/heb.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localStorage } from "../localstorageProvider";

const STORE_LANGUAGE_KEY = "language";

const languageDetectorPlugin = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async function (callback) {
    try {
      // Get stored language from AsyncStorage
      await localStorage.getItemString(STORE_LANGUAGE_KEY).then((language) => {
        if (language) {
          // If language was stored before, use this language in the app
          return callback(language);
        } else {
          // If language was not stored yet, use English
          return callback("en");
        }
      });
    } catch (error) {
      console.log("Error reading language", error);
    }
  },
  cacheUserLanguage: async function (language) {
    try {
      // Save a user's language choice in AsyncStorage
      await localStorage.setItemString(STORE_LANGUAGE_KEY, language);
    } catch (error) {
      console.log("Error saving language", error);
    }
  },
};

const resources = {
  en: {
    translation: en,
  },
  rus: {
    translation: rus,
  },
  heb: {
    translation: heb,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    compatibilityJSON: "v3",
    fallbackLng: "en", // Fallback language is set to English
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  });

export default i18n;

// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import en from "../../components/language-utils/en.json";
// import rus from "../../components/language-utils/rus.json";
// import heb from "../../components/language-utils/heb.json";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const STORE_LANGUAGE_KEY = "language";

// const languageDetectorPlugin = {
//   type: "languageDetector",
//   async: true,
//   init: () => {},
//   detect: async function callback(lang) {
//     try {
//       // get stored language from Async storage
//       // put your own language detection logic here
//       await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
//         if (language) {
//           //if language was stored before, use this language in the app
//           return callback(language);
//         } else {
//           //if language was not stored yet, use english
//           return callback("en");
//         }
//       });
//     } catch (error) {
//       console.log("Error reading language", error);
//     }
//   },
//   cacheUserLanguage: async function (language) {
//     try {
//       //save a user's language choice in Async storage
//       await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
//     } catch (error) {}
//   },
// };
// const resources = {
//   en: {
//     translation: en,
//   },
//   rus: {
//     translation: rus,
//   },
//   heb: {
//     translation: heb,
//   },
// };

// i18n
//   .use(initReactI18next)
//   .use(languageDetectorPlugin)
//   .init({
//     resources,
//     compatibilityJSON: "v3",
//     // fallback language is set to english
//     fallbackLng: "en",
//     interpolation: {
//       escapeValue: false,
//     },
//   });
// export default i18n;
