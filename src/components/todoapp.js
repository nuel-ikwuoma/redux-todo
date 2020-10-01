import React from 'react';
import ConnectedTodoFilter from './todofilter';
import ConnectedTodoCreate from './todocreate';
import ConnectedTodoList from './todolist';
import ConnectedNotification from './notification';

const TodoApp = () => (
  <div>
    <ConnectedTodoFilter />
    <ConnectedTodoCreate />
    <ConnectedTodoList />
    <ConnectedNotification />
  </div>
);

export default TodoApp;
