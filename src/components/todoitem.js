import React from 'react';
import { connect } from 'react-redux';
import { doToggleTodo } from '../actionCreators';

// TodoItem Component
const TodoItem = ({ todo, onToggleTodo }) => {
  const { name, id, completed } = todo;
  return (
    <div>
      {name}
      <button type='button' onClick={() => onToggleTodo(id)}>
        {completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
    </div>
  );
};

const getTodo = (state, id) => state.todoState.entities[id];

//
const mapStateToPropsItem = (state, props) => ({
  todo: getTodo(state, props.todoId),
});

const mapDispatchToPropsItem = (dispatch) => ({
  onToggleTodo: (id) => dispatch(doToggleTodo(id)),
});

// connect components to redux

const ConnectedTodoItem = connect(
  mapStateToPropsItem,
  mapDispatchToPropsItem
)(TodoItem);

export default ConnectedTodoItem;
