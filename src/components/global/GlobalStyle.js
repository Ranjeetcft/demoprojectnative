import { StyleSheet } from "react-native";
import { Colors, Font, mobileH, mobileW } from "../Colorsfont";

export const globalStyles = StyleSheet.create({
  screenHeading: {
    top: 2,
    textAlign: "center",
    fontSize: (mobileW * 4) / 100,
    fontFamily: Font.FontMedium,
    color: Colors.black_color,
  },
});
