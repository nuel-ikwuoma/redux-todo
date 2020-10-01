import {
  TODO_ADD,
  TODO_TOGGLE,
  FILTER_SET,
  NOTIFICATION_HIDE,
} from '../actionTypes';

// Action creators
const doAddTodo = (id, name) => ({
  type: TODO_ADD,
  todo: { id, name },
});

const doToggleTodo = (id) => ({
  type: TODO_TOGGLE,
  todo: { id },
});

const doFilterTodo = (filter) => ({
  type: FILTER_SET,
  filter,
});

const doHideNotification = (id) => ({
  type: NOTIFICATION_HIDE,
  id,
});

export { doAddTodo, doToggleTodo, doFilterTodo, doHideNotification };
