import React, { useState, useCallback } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { Colors, mobileH, mobileW } from "../Colorsfont";
import LinearGradient from "react-native-linear-gradient";
import LanguageDropdown from "../dropdown/LanguageDropdown";
import CurrencyDropdown from "../dropdown/CurrencyDropdown";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";

const HeaderComponent = React.memo(
  ({ language, modalVisible, setModalVisible, refreshing, setRefreshing }) => {
    const [isOpenLanguage, setIsOpenLanguage] = useState(false);
    const [isOpenCurrency, setIsOpenCurrency] = useState(false);
    const [scale, setScale] = useState("0deg");
    const toggleLanguageDropdown = useCallback(() => {
      setIsOpenLanguage((prev) => !prev);
    }, []);

    const toggleCurrencyDropdown = useCallback(() => {
      setIsOpenCurrency((prev) => !prev);
    }, []);

    const toggleModal = useCallback(() => {
      setModalVisible((prev) => !prev);
    }, [setModalVisible]);

    const handleRefresh = useCallback(() => {
      setRefreshing((prev) => !prev);
      setScale("90deg");
      setTimeout(() => {
        setScale("180deg");
        setTimeout(() => {
          setScale("270deg");
          setTimeout(() => {
            setScale("0deg");
          }, 100);
        }, 100);
      }, 100);
    }, [setRefreshing]);

    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[Colors.gradient_color1, Colors.gradient_color2]}
        style={{
          alignSelf: "center",
          marginTop: (mobileH * 5) / 100,
          marginBottom: (mobileH * 2) / 100,
          height: (mobileW * 18) / 100,
          width: (mobileW * 95) / 100,
          borderRadius: (mobileW * 9) / 100,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: (mobileW * 5) / 100,
        }}
      >
        <Image
          style={{ width: (mobileW * 30) / 100, height: (mobileW * 15) / 100 }}
          source={require("../../asset/icons/appscreenlogo.png")}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleRefresh}
          style={{
            transform: [{ rotate: scale }],
            marginRight: (mobileW * 2) / 100,
          }}
        >
          <Icon1 name="refresh" size={(mobileW * 7) / 100} color="black" />
        </TouchableOpacity>

        <View
          style={{
            width: (mobileW * 50) / 100,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <LanguageDropdown
            languageset={language}
            isOpen={isOpenLanguage}
            toggleDropdown={toggleLanguageDropdown}
          />
          <CurrencyDropdown
            languageset={language}
            isOpen={isOpenCurrency}
            toggleDropdown={toggleCurrencyDropdown}
          />
          <TouchableOpacity onPress={toggleModal} activeOpacity={0.5}>
            <Image
              style={{
                width: (mobileW * 7) / 100,
                height: (mobileW * 7) / 100,
              }}
              source={require("../../asset/icons/menu.png")}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
);

export default HeaderComponent;

// import React, { useState } from "react";
// import { Image, View, TouchableOpacity } from "react-native";
// import { Colors, mobileH, mobileW } from "../Colorsfont";
// import LinearGradient from "react-native-linear-gradient";
// import LanguageDropdown from "../dropdown/LanguageDropdown";
// import CurrencyDropdown from "../dropdown/CurrencyDropdown";

// import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
// function HeaderComponent({
//   language,
//   modalVisible,
//   setModalVisible,
//   refreshing,
//   setRefreshing,
// }) {
//   const [isOpenLanguage, setIsOpenLanguage] = useState(false);
//   const [isOpenCurrency, setIsOpenCurrency] = useState(false);

//   return (
//     <LinearGradient
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 0 }}
//       colors={[Colors.gradient_color1, Colors.gradient_color2]}
//       style={{
//         alignSelf: "center",
//         marginTop: (mobileH * 5) / 100,
//         marginBottom: (mobileH * 2) / 100,
//         height: (mobileW * 18) / 100,
//         width: (mobileW * 95) / 100,
//         borderRadius: (mobileW * 9) / 100,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingRight: (mobileW * 5) / 100,
//       }}
//     >
//       <Image
//         style={{ width: (mobileW * 30) / 100, height: (mobileW * 15) / 100 }}
//         source={require("../../asset/icons/appscreenlogo.png")}
//       />
//       <TouchableOpacity
//         activeOpacity={0.5}
//         onPress={() => {
//           setRefreshing(!refreshing);
//         }}
//         style={{ marginRight: (mobileW * 2) / 100 }}
//       >
//         <Icon1 name="refresh" size={(mobileW * 7) / 100} color="black" />
//       </TouchableOpacity>

//       <View
//         style={{
//           width: (mobileW * 50) / 100,
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <LanguageDropdown
//           languageset={language}
//           isOpen={isOpenLanguage}
//           toggleDropdown={() => {
//             setIsOpenLanguage(!isOpenLanguage);
//           }}
//         />
//         <CurrencyDropdown
//           languageset={language}
//           isOpen={isOpenCurrency}
//           toggleDropdown={() => {
//             setIsOpenCurrency(!isOpenCurrency);
//           }}
//         />
//         <TouchableOpacity
//           onPress={() => {
//             setModalVisible(!modalVisible);
//           }}
//           activeOpacity={0.5}
//         >
//           <Image
//             style={{
//               width: (mobileW * 7) / 100,
//               height: (mobileW * 7) / 100,
//             }}
//             source={require("../../asset/icons/menu.png")}
//           />
//         </TouchableOpacity>
//       </View>
//     </LinearGradient>
//   );
// }

// export default HeaderComponent;
