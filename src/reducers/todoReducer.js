import { schema, normalize } from "normalizr";

import { TODO_ADD, TODO_TOGGLE } from "../actionTypes";


// initial todos
const todos = [
    { id: "1", name: "Learn redux" },
    { id: "2", name: "Familiarize with redux apis" },
    { id: "3", name: "Build a simple todo app" },
  ];

//
const todoSchema = new schema.Entity("todo");
const normalizedTodos = normalize(todos, [todoSchema]);


//
const initialTodosState = {
    entities: normalizedTodos.entities.todo,
    ids: normalizedTodos.result,
  };

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

// apply selectors (WTF is da meaning of selectors)
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
  

export default todoReducer