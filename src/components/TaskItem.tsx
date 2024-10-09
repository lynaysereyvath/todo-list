import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import CustomRoundCheckBox from './CustomRoundCheckBox';
import {COLORS, FONTSIZE} from '../constants/colors';
import {isToday} from '../helpers/dateHelper';

const calendarIcon = require('../assets/images/calendar.png');

export interface TaskItemType {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: Number;
}

export interface TaskItemProp {
  task: TaskItemType;
  onChecked: any;
}

const TaskItem: React.FC<TaskItemProp> = ({task, onChecked}) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <CustomRoundCheckBox
          isChecked={task.isCompleted == 1}
          onPress={() => onChecked()}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>{task.title}</Text>
          <Text style={styles.descriptionText}>{task.description}</Text>
          <View style={styles.dateContainer}>
            <Image
              source={calendarIcon}
              tintColor={COLORS.primaryRed}
              style={styles.calendarIcon}
            />
            <Text style={styles.dateText}>{isToday(new Date(task.date))}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 17,
    gap: 17,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
  },
  titleText: {
    fontSize: FONTSIZE.taskTitle,
    color: COLORS.titleColor,
  },
  descriptionText: {
    fontSize: FONTSIZE.taskDescription,
    color: COLORS.descriptionColor,
  },
  dateText: {
    fontSize: FONTSIZE.taskDate,
    color: COLORS.primaryRed,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  calendarIcon: {
    width: 13,
    height: 13,
  },
});

export default TaskItem;
