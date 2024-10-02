import React, { useState } from "react";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import { Colors, Font, mobileH, mobileW } from "../Colorsfont";
import Icon from "react-native-vector-icons/Entypo";

const CurrencyDropdown = ({ languageset, isOpen, toggleDropdown }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("$");
  const currencies = ["$", "€", "₪", "₺"];

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    toggleDropdown(); // Close dropdown after selection
  };

  global.currency == "$";
  const renderCurrencyOption = ({ item }) => (
    <>
      <TouchableOpacity onPress={() => handleCurrencySelect(item)}>
        <View
          style={{
            borderRadius: (mobileW * 2) / 100,
            backgroundColor: Colors.white_color,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              top: 2,
              marginHorizontal: (mobileW * 1) / 100,
              textAlign: "center",
              fontSize: (mobileW * 3.5) / 100,
              fontFamily: Font.FontSemiBold,
              color: Colors.black_color,
            }}
          >
            {item}
          </Text>
          <Icon name="chevron-down" size={(mobileW * 5) / 100} color="black" />
        </View>
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
          paddingVertical: (mobileW * 1) / 100,
        }}
      >
        <Text
          style={{
            top: 2,
            marginHorizontal: (mobileW * 1) / 100,
            textAlign: "center",
            fontSize: (mobileW * 3.5) / 100,
            fontFamily: Font.FontSemiBold,
            color: Colors.black_color,
          }}
        >
          {selectedCurrency}
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
            data={currencies}
            renderItem={renderCurrencyOption}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      )}
    </View>
  );
};

export default CurrencyDropdown;
