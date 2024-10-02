import React, { createContext, useState, useContext, useEffect } from "react";
import { localStorage } from "./localstorageProvider";
import { I18nManager, StatusBar } from "react-native";
import { Colors } from "./Colorsfont";

const LanguageContext = createContext();
import i18n from "i18next";
export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState(0); // 0 for default language, 1 for alternative language

  useEffect(() => {
    console.log("working");
    const setAppLanguage = async () => {
      let languageSet = await localStorage.getItemString("language");
      console.log("languageSet", languageSet);
      if (languageSet !== null && languageSet !== undefined) {
        setLanguage(languageSet);
        changeLanguage(languageSet);
      }
    };
    setAppLanguage();
  }, []);
  const changeLanguage = (language) => {
    console.log("language", language);

    i18n.changeLanguage(language);
  };
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
