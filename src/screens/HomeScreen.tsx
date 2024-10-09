import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import TaskItem from '../components/TaskItem';
import {COLORS, FONTSIZE} from '../constants/colors';
import {FloatingAction} from 'react-native-floating-action';
import {
  addTask,
  getUndoneTask,
  initializeDatabase,
  tickTask,
} from '../helpers/sqliteHelper';
import {taskReducer, actionTypes, initialState} from '../reducers/taskReducer';
import NewTaskModal from '../components/NewTaskModal';

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const initialization = async () => {
      await initializeDatabase();
      const tasks = await getUndoneTask();
      dispatch({type: actionTypes.INITIALIZE, payload: tasks});
    };
    initialization();
  }, []);

  const handleAddItem = async (title: string, desc: string, date: string) => {
    console.log(title);
    if (!title.trim() || !desc.trim() || !date.trim()) {
      return;
    }
    const id = await addTask(title, desc, date, 0);
    console.log('id', id);
    dispatch({
      type: actionTypes.ADD_TASK,
      payload: {
        id,
        title: title,
        description: desc,
        date: date,
        isCompleted: 0,
      },
    });
    hideModal();
  };

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleTickTask = async (id: Number) => {
    console.log('handle tick task ');
    await tickTask(id);
    dispatch({type: actionTypes.TICK_TASK, payload: {id}});
  };

  const sortedTasks = state.tasks.sort(
    (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Today</Text>
        <Text style={styles.numberOfTaskText}>{sortedTasks.length} tasks</Text>
      </View>
      <FlatList
        data={sortedTasks}
        renderItem={({item}) => (
          <TaskItem task={item} onChecked={() => handleTickTask(item.id)} />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Separator />}
        ListFooterComponent={() => <Separator />}
      />

      <FloatingAction
        color={COLORS.primaryRed}
        onPressMain={toggleModal}
        showBackground={false}
      />

      <NewTaskModal
        isVisible={isModalVisible}
        onAddTask={(title: string, desc: string, date: string) => {
          handleAddItem(title, desc, date);
        }}
        onToggleModalVisibility={(isVisible: boolean) =>
          setModalVisible(isVisible)
        }
      />
    </SafeAreaView>
  );
};

const Separator = () => {
  return (
    <View
      style={{
        flex: 1,
        height: 1,
        marginStart: 15,
        backgroundColor: COLORS.primaryGray,
        opacity: 0.3,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    padding: 20,
  },
  titleText: {
    fontSize: 20,
  },
  numberOfTaskText: {
    fontSize: FONTSIZE.taskDescription,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 18,
  },
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

export default HomeScreen;
