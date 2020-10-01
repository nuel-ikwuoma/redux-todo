import React from 'react';
import {  connect} from "react-redux";
import ConnectedTodoItem from "./todoitem"

const VISIBILITY_FILTERS = {
    SHOW_COMPLETED: (item) => item.completed,
    SHOW_INCOMPLETED: (item) => !item.completed,
    SHOW_ALL: (item) => true,
  };

const TodoList = ({ todosAsIds }) => (
  <div>
    {todosAsIds.map((todoId) => (
      <ConnectedTodoItem key={todoId} todoId={todoId} />
    ))}
  </div>
);

const mapStateToPropsList = (state) => ({
  todosAsIds: getTodosAsIds(state),
});

const ConnectedTodoList = connect(mapStateToPropsList)(TodoList);
// selector
function getTodosAsIds(state) {
  return state.todoState.ids
    .map((id) => state.todoState.entities[id])
    .filter(VISIBILITY_FILTERS[state.filterState])
    .map((todo) => todo.id);
}

export default ConnectedTodoList