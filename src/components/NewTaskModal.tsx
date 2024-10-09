import {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS, FONTSIZE} from '../constants/colors';
import {isToday} from '../helpers/dateHelper';

import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';

const calendarIcon = require('../assets/images/calendar.png');
const sendIcon = require('../assets/images/send.png');

interface NewTaskModalProp {
  isVisible: boolean;
  onToggleModalVisibility: any;
  onAddTask: any;
}

const NewTaskModal: React.FC<NewTaskModalProp> = ({
  isVisible,
  onToggleModalVisibility,
  onAddTask,
}) => {
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');

  // Function to toggle the modal visibility

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // Keep showing picker for iOS, close it for Android
    setDate(currentDate.toISOString()); // Update the selected date
  };

  // Function to show the date picker
  const showDatepicker = () => {
    setShow(true); // Show the picker
  };

  return (
    <>
      <Modal
        isVisible={isVisible}
        swipeDirection="down" // Enables swipe down to close the BottomSheet
        onSwipeComplete={() => onToggleModalVisibility(!isVisible)}
        onBackdropPress={() => onToggleModalVisibility(!isVisible)} // Closes the BottomSheet when user taps outside
        style={styles.bottomModal} // Styles the BottomSheet to stick to the bottom
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.sheetContainer}>
            <TextInput
              placeholder="Task Name"
              style={styles.titleInputText}
              onChangeText={value => setTitle(value)}
              value={title}
            />
            <TextInput
              placeholder="Description"
              multiline={true}
              numberOfLines={3}
              style={styles.descriptionInputText}
              value={desc}
              onChangeText={value => setDesc(value)}
            />

            <TouchableOpacity onPress={() => showDatepicker()}>
              <View style={styles.dateContainer}>
                <Image source={calendarIcon} style={styles.calendarIcon} />
                <Text style={styles.dateText}>
                  {date ? isToday(new Date(date)) : 'No date'}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sendIconContainer}
              onPress={() => {
                //   handleAddItem();
                onAddTask(title, desc, date);
              }}>
              <Image
                source={sendIcon}
                tintColor="#fff"
                style={styles.sendIcon}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {show && Platform.OS == 'android' && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="calendar"
          onChange={onChange}
        />
      )}
      {show && Platform.OS == 'ios' && (
        <DatePicker
          modal
          open={show}
          date={new Date()}
          mode="date"
          onConfirm={confirmDate => {
            setShow(false);
            setDate(confirmDate.toISOString());
          }}
          onCancel={() => {
            setShow(false);
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  titleInputText: {
    width: '100%',
    height: Platform.OS == 'ios' ? 40 : null,
    fontSize: 16,
  },
  descriptionInputText: {
    height: Platform.OS == 'ios' ? 70 : null,
    width: '100%',
    fontSize: 14,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.primaryGray,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    opacity: 0.3,
  },
  dateText: {
    fontSize: 12,
  },
  calendarIcon: {
    width: 12,
    height: 12,
  },
  sendIconContainer: {
    width: 35,
    height: 35,
    backgroundColor: COLORS.primaryRed,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: 10,
  },
  sendIcon: {
    width: 25,
    height: 25,
  },
});

export default NewTaskModal;
