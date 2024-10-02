import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  DevSettings,
  TouchableOpacity,
  View,
  FlatList,
  I18nManager,
} from "react-native";
import { Colors, Font, mobileH, mobileW } from "../Colorsfont";
import Icon from "react-native-vector-icons/Entypo";
import { config } from "../configProvider";
import { useLanguage } from "../LanguageContext";
import { localStorage } from "../localstorageProvider";
import i18n from "i18next";
const LanguageDropdown = ({ languageset, isOpen, toggleDropdown }) => {
  const { language, setLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(
    language == "rus" || language == 2
      ? "RUS"
      : language == "heb" || language == 1
      ? "HEB"
      : "ENG"
  );
  const languages = [
    { id: 0, image: require("../../asset/icons/ENG.png"), name: "ENG" },
    { id: 1, image: require("../../asset/icons/HEB.png"), name: "HEB" },
    { id: 2, image: require("../../asset/icons/RUS.png"), name: "RUS" },
  ];

  useEffect(() => {
    console.log("language 2999", language);
    setSelectedLanguage(
      language == "rus" || language == 2
        ? "RUS"
        : language == "heb" || language == 1
        ? "HEB"
        : "ENG"
    );
  }, [language]);

  const handleSelectLanguage = (lang) => {
    toggleDropdown();
    changeLanguage(lang.name);
    setSelectedLanguage(lang.name);
    // Close the dropdown after selection
  };
  const changeLanguage = (lang) => {
    if (lang == "ENG") {
      setLanguage(0);
      i18n.changeLanguage("en");

      localStorage.setItemString("language", "en");
    } else if (lang == "RUS") {
      setLanguage(2);
      localStorage.setItemString("language", "rus");
      i18n.changeLanguage("rus");
    } else if (lang == "HEB") {
      setLanguage(1);
      i18n.changeLanguage("heb");
      localStorage.setItemString("language", "heb");
      // DevSettings.reload();
    }
  };
  const renderLanguageOption = ({ item }) => (
    <>
      <TouchableOpacity
        onPress={() => handleSelectLanguage(item)}
        style={{
          borderRadius: (mobileW * 2) / 100,
          backgroundColor: Colors.white_color,
          flexDirection: "row",
          alignItems: "center",
          padding: (mobileW * 1) / 100,
        }}
      >
        <Image
          style={{
            width: (mobileW * 5) / 100,
            height: (mobileW * 5) / 100,
            borderRadius: (mobileW * 2.5) / 100,
          }}
          source={item.image}
        />
        <Text
          style={{
            top: 2,
            marginHorizontal: (mobileW * 2) / 100,
            textAlign: "center",
            fontSize: (mobileW * 3.5) / 100,
            fontFamily: Font.FontSemiBold,
            color: Colors.black_color,
          }}
        >
          {item.name}
        </Text>
        <Icon name="chevron-down" size={(mobileW * 5) / 100} color="black" />
      </TouchableOpacity>
    </>
  );

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleDropdown}
        style={{
          borderWidth: (mobileW * 0.3) / 100,
          borderColor: Colors.black_color,
          borderRadius: (mobileW * 2) / 100,
          backgroundColor: Colors.white_color,
          flexDirection: "row",
          alignItems: "center",
          padding: (mobileW * 1) / 100,
        }}
      >
        <Image
          style={{
            width: (mobileW * 5) / 100,
            height: (mobileW * 5) / 100,
            borderRadius: (mobileW * 2.5) / 100,
          }}
          source={
            languages.find((lang) => lang.name === selectedLanguage)?.image
          }
        />
        <Text
          style={{
            top: 2,
            marginHorizontal: (mobileW * 2) / 100,
            textAlign: "center",
            fontSize: (mobileW * 3.5) / 100,
            fontFamily: Font.FontSemiBold,
            color: Colors.black_color,
          }}
        >
          {selectedLanguage}
        </Text>
        <Icon name="chevron-down" size={(mobileW * 5) / 100} color="black" />
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            borderWidth: (mobileW * 0.3) / 100,
            borderColor: Colors.black_color,
            position: "absolute",
            zIndex: 1,
            top: (mobileH * 5) / 100,
            backgroundColor: Colors.white_color,
            borderRadius: (mobileW * 2) / 100,
          }}
        >
          <FlatList
            data={languages}
            renderItem={renderLanguageOption}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default LanguageDropdown;
