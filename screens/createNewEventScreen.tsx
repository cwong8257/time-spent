import React, {useState} from 'react';
import {SafeAreaView, Platform} from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

/*
 * Input form form
 *  Time (Start/End)
 *  Date (Start/End)
 *  Title
 *  Description
 *  Tagging
 */

export default CreateNewEventScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(true);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = new Date(selectedDate);

    if (event.type === 'set') {
      console.log('currentDate - before', date.toString());
      currentDate.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      );
      console.log('currentDate - after', currentDate.toString());
      setDate(currentDate);
    }
    setShowDatePicker(false);
  };

  const onChangeTime = (event, selectedTime) => {
    console.log(Platform.OS, 'onChangeTime', selectedTime);
    const currentTime = selectedTime;
    if (event.type === 'set') {
      setDate(currentTime);
    }
    setShowTimePicker(false);
  };

  const iosChangeDateTime = (event, selectedDateTime) => {
    setDate(selectedDateTime);
  };

  return (
    <SafeAreaView>
      {Platform.OS === 'android' ? (
        <>
          {showDatePicker && (
            <RNDateTimePicker
              value={date}
              mode="date"
              onChange={onChangeDate}
            />
          )}
          {showTimePicker && (
            <RNDateTimePicker
              value={date}
              mode="time"
              onChange={onChangeTime}
            />
          )}
        </>
      ) : (
        <RNDateTimePicker
          value={date}
          mode="datetime"
          onChange={iosChangeDateTime}
        />
      )}
    </SafeAreaView>
  );
};
