import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import * as serviceWorker from "./serviceWorker";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import { createLogger } from "redux-logger";

import { schema, normalize } from "normalizr";

import uuid from "uuid/dist/v4";

import thunk from "redux-thunk";

const TODO_ADD = "TODO_ADD";
const TODO_TOGGLE = "TODO_TOGGLE";
const FILTER_SET = "FILTER_SET";
const NOTIFICATION_HIDE = "NOTIFICATION_HIDE";

// initial todos
const todos = [
  { id: "1", name: "Hands On: Redux Standalone with advanced Actions" },
  { id: "2", name: "Hands On: Redux Standalone with advanced Reducers" },
  { id: "3", name: "Hands On: Bootstrap App with Redux" },
  { id: "4", name: "Hands On: Naive Todo with React and Redux" },
  { id: "5", name: "Hands On: Sophisticated Todo with React and Redux" },
  { id: "6", name: "Hands On: Connecting State Everywhere" },
  { id: "7", name: "Hands On: Todo with advanced Redux" },
  { id: "8", name: "Hands On: Todo but more Features" },
  { id: "9", name: "Hands On: Todo with Notifications" },
  { id: "10", name: "Hands On: Hacker News with Redux" },
];

// schemas
const todoSchema = new schema.Entity("todo");
const normalizedTodos = normalize(todos, [todoSchema]);
console.log(normalizedTodos);

const initialTodosState = {
  entities: normalizedTodos.entities.todo,
  ids: normalizedTodos.result,
};

// combine all reducers
const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer,
  notificationState: notificationReducer,
});

// todoReducer
function todoReducer(state = initialTodosState, action) {
  switch (action.type) {
    case TODO_ADD: {
      return applyAddTodo(state, action);
    }
    case TODO_TOGGLE: {
      return applyToggleTodo(state, action);
    }
    default:
      return state;
  }
}

function applyAddTodo(state, action) {
  const todo = { ...action.todo, completed: false };
  const entities = { ...state.entities, [todo.id]: todo };
  const ids = [...state.ids, action.todo.id];
  return { ...state, entities, ids };
}

function applyToggleTodo(state, action) {
  const id = action.todo.id;
  const todo = state.entities[id];
  const toggledTodo = { ...todo, completed: !todo.completed };
  const entities = { ...state.entities, [id]: toggledTodo };

  return { ...state, entities };
}

// filterReducer
function filterReducer(state = "SHOW_ALL", action) {
  switch (action.type) {
    case FILTER_SET: {
      return applyFilterSet(state, action);
    }
    default:
      return state;
  }
}

function applyFilterSet(state, action) {
  return action.filter;
}

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

const logger = createLogger();

// STORE
const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk, logger)
);

// get initial state  -> For Testing
console.log("INITIAL_STATE", typeof store.getState());

const TodoApp = () => (
  <div>
    <ConnectedTodoFilter />
    <ConnectedTodoCreate />
    <ConnectedTodoList />
    <ConnectedNotification />
  </div>
);

const TodoList = ({ todosAsIds }) => (
  <div>
    {todosAsIds.map((todoId) => (
      <ConnectedTodoItem key={todoId} todoId={todoId} />
    ))}
  </div>
);

const TodoItem = ({ todo, onToggleTodo }) => {
  const { name, id, completed } = todo;
  return (
    <div>
      {name}
      <button type="button" onClick={() => onToggleTodo(id)}>
        {completed ? "Mark Incomplete" : "Mark Complete"}
      </button>
    </div>
  );
};

// selector functions
function getTodosAsIds(state) {
  return state.todoState.ids
    .map((id) => state.todoState.entities[id])
    .filter(VISIBILITY_FILTERS[state.filterState])
    .map((todo) => todo.id);
}

const getTodo = (state, id) => state.todoState.entities[id];

// connect <TodoApp /> to 'todoState' state
const mapStateToPropsList = (state) => ({
  todosAsIds: getTodosAsIds(state),
});

// 'props' comes from the HOC <ConnectedTodoItem />
const mapStateToPropsItem = (state, props) => ({
  todo: getTodo(state, props.todoId),
});

const mapDispatchToPropsItem = (dispatch) => ({
  onToggleTodo: (id) => dispatch(doToggleTodo(id)),
});

// connect components to redux
const ConnectedTodoList = connect(mapStateToPropsList)(TodoList);

const ConnectedTodoItem = connect(
  mapStateToPropsItem,
  mapDispatchToPropsItem
)(TodoItem);

/** COMPONENT TO CREATE TODOs */
class TodoCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  onChange = (event) => {
    const value = event.target.value;
    this.setState({ value });
  };

  onCreateTdo = (event) => {
    this.props.onAddTodo(this.state.value);
    this.setState({ value: "" });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onCreateTdo}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.onChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

function mapDispatchToPropsCreate(dispatch) {
  return {
    onAddTodo: (name) => dispatch(doAddTodoWithNotification(uuid(), name)),
  };
}

const ConnectedTodoCreate = connect(null, mapDispatchToPropsCreate)(TodoCreate);

/** COMPONENT TO FILTER TODOs */
function Filter({ onSetFilter }) {
  return (
    <div>
      Show{":"}
      <button type="button" onClick={() => onSetFilter("SHOW_ALL")}>
        All
      </button>
      <button type="button" onClick={() => onSetFilter("SHOW_COMPLETED")}>
        Completed
      </button>
      <button type="button" onClick={() => onSetFilter("SHOW_INCOMPLETED")}>
        Incompleted
      </button>
    </div>
  );
}

function mapDispatchToPropsFilter(dispatch) {
  return {
    onSetFilter: (filterType) => dispatch(doFilterTodo(filterType)),
  };
}

const ConnectedTodoFilter = connect(null, mapDispatchToPropsFilter)(Filter);

const VISIBILITY_FILTERS = {
  SHOW_COMPLETED: (item) => item.completed,
  SHOW_INCOMPLETED: (item) => !item.completed,
  SHOW_ALL: (item) => true,
};

// NOTIFICATION REDUCER
function notificationReducer(state = {}, action) {
  switch (action.type) {
    case TODO_ADD: {
      return applySetNotifyAboutReducer(state, action);
    }
    case NOTIFICATION_HIDE: {
      return applyHideNotification(state, action);
    }
    default:
      return state;
  }
}

function applySetNotifyAboutReducer(state, action) {
  const { name, id } = action.todo;
  return { ...state, [id]: "Todo created: " + name };
}

function applyHideNotification(state, action) {
  const { [action.id]: notificationToemove, ...restNotification } = state;
  return restNotification;
}

function Notifications({ notifications }) {
  return (
    <div>
      {notifications.map((note, i) => (
        <div key={note + i}>{note}</div>
      ))}
    </div>
  );
}

function mapStateToPropsNotifications(state) {
  return {
    notifications: getNotifications(state),
  };
}

const ConnectedNotification = connect(mapStateToPropsNotifications)(
  Notifications
);
// console.log(ConnectedNotification)

const getNotifications = (state) => getArrayOfObject(state.notificationState);

const getArrayOfObject = (object) =>
  Object.keys(object).map((key) => object[key]);

// ACTION CREATOR FOR HIDING NOTIFICATION
const doHideNotification = (id) => ({
  type: NOTIFICATION_HIDE,
  id,
});

const doAddTodoWithNotification = (id, name) => (dispatch) => {
  dispatch(doAddTodo(id, name));

  setTimeout(() => {
    dispatch(doHideNotification(id));
  }, 5000);
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
