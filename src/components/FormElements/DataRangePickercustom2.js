import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableNativeFeedback,
  Image,
  Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
export const mobileH = Math.round(Dimensions.get("window").height);
export const mobileW = Math.round(Dimensions.get("window").width);
export default function DataRangePickercustom2({
  onChange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  clearCalender,
  handleClear,
}) {
  const [selectedDates, setSelectedDates] = useState({});
  const [isStartSelected, setIsStartSelected] = useState(false);
  // const [startDate, setStartDate] = useState(parentStartDate);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const toggleCalendar = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  useEffect(() => {
    setStartDate(moment().startOf("month").toDate());
    setEndDate(moment().endOf("month").toDate());
  }, []);

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };
  useEffect(() => {
    setSelectedDates({});
  }, [clearCalender]);

  const onDayPress = (day) => {
    if (!isStartSelected) {
      setSelectedDates({
        [day.dateString]: {
          selected: true,
          startingDay: true,
          color: "#502077",
          textColor: "white",
          margin: 5,
          padding: 5,
        },
      });
      setIsStartSelected(true);
      setStartDate(day.dateString);
      setEndDate(day.dateString);
    } else {
      endDate = day.dateString;
      const markedDates = { ...selectedDates };

      if (startDate && endDate && endDate >= startDate) {
        let currentDate = startDate;
        while (currentDate !== endDate) {
          markedDates[currentDate] = {
            color: "#502077",
            textColor: "white",
            margin: 5,
            padding: 5,
          };
          const newDate = new Date(currentDate);
          newDate.setDate(newDate.getDate() + 1);
          currentDate = newDate.toISOString().split("T")[0];
        }

        markedDates[endDate] = {
          selected: true,
          endingDay: true,
          color: "#502077",
          textColor: "white",
          margin: 5,
          padding: 5,
        };

        setSelectedDates(markedDates);
        // setIsPickerVisible(false);
        if (onChange) {
          onChange([startDate, endDate]);
        }
      }
      setIsStartSelected(false);
    }
  };

  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={togglePicker} style={styles.customInput}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "#000",
              // backgroundColor:"red"
            }}
          >
            {startDate ? moment(startDate).format("MMM D, YYYY") : "Start Date"}{" "}
            - {endDate ? moment(endDate).format("MMM D, YYYY") : "end date"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        // animationType="slide"
        animationType="fade"
        transparent={true}
        visible={false}
        onRequestClose={toggleCalendar}
      >
        <View style={styles.modalContainer}>
          <TouchableNativeFeedback onPress={toggleCalendar}>
            <View style={styles.modalContent}>
              <Calendar
                style={styles.calendar}
                onDayPress={onDayPress}
                markingType="period"
                markedDates={selectedDates}
                theme={{
                  textMonthFontSize: 12,
                  textMonthFontWeight: "bold",
                  arrowColor: "#fff",
                  arrowStyle: {
                    backgroundColor: "#6d2299",
                    borderRadius: 50,
                    height: 30,
                    width: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  textDayFontSize: 12,
                  textDayColor: "black",
                  textDayFontWeight: "bold",
                  textSectionTitleColor: "#000",
                  "stylesheet.calendar.header": {
                    header: {
                      backgroundColor: "#f0f0f0",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: 40,
                    },
                    dayHeader: {
                      backgroundColor: "#f0f0f0",
                      marginTop: -10,
                      textAlign: "center",
                      fontSize: 12,
                      color: "#000",
                      padding: 10,
                      // borderBottomcolor: '#000',
                      borderBottomWidth: 1,
                    },
                  },
                }}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    overflow: "hidden",
  },
  customInput: {
    color: "balck",

    borderRadius: 5,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calendar: {
    width: (mobileW * 60) / 100,
    margin: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    shadowColor: "#171717",
    elevation: 10,
  },
  modalContent: {
    alignSelf: "center",
    height: mobileH / 1,
    width: mobileW / 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
