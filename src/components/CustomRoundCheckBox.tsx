import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constants/colors';

type CustomRoundCheckBoxProp = {
  isChecked: boolean;
  onPress: any;
};

const CustomRoundCheckBox = ({isChecked, onPress}: CustomRoundCheckBoxProp) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View
        style={[
          styles.circle,
          isChecked ? {backgroundColor: COLORS.primaryRed} : null,
          isChecked ? {borderColor: COLORS.primaryRed} : null,
        ]}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: SIZES.checkBoxWidth,
    height: SIZES.checkBoxWidth,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: COLORS.checkBoxBorderColor,
  },
});

export default CustomRoundCheckBox;
