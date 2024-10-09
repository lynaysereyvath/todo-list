const actionTypes = {
  INITIALIZE: 'INITIALIZE',
  GET_ALL_TASKS: 'GET_ALL_TASKS',
  ADD_TASK: 'ADD_TASK',
  TICK_TASK: 'TICK_TASK',
};

const initialState = {
  tasks: [],
};

const taskReducer = (state: any, action: any) => {
  switch (action.type) {
    case actionTypes.INITIALIZE:
      return {...state, tasks: action.payload};
    case actionTypes.GET_ALL_TASKS:
      return {...state, tasks: action.payload};
    case actionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.desc,
            date: action.payload.date,
            isCompleted: action.isCompleted,
          },
        ],
      };
    case actionTypes.TICK_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task: any) => task.id != action.payload.id),
      };
    default:
      return state;
  }
};

export {taskReducer, actionTypes, initialState};
