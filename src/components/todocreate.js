import React from 'react';
import { connect } from 'react-redux';
import uuid from "uuid/dist/v4";

import { doAddTodo, doHideNotification } from '../actionCreators';

/** COMPONENT TO CREATE TODOs */
class TodoCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onChange = (event) => {
    const value = event.target.value;
    this.setState({ value });
  };

  onCreateTdo = (event) => {
    this.props.onAddTodo(this.state.value);
    this.setState({ value: '' });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onCreateTdo}>
          <input
            type='text'
            value={this.state.value}
            onChange={this.onChange}
          />
          <button type='submit'>Add</button>
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

const doAddTodoWithNotification = (id, name) => (dispatch) => {
  dispatch(doAddTodo(id, name));

  setTimeout(() => {
    dispatch(doHideNotification(id));
  }, 5000);
};

const ConnectedTodoCreate = connect(null, mapDispatchToPropsCreate)(TodoCreate);
export default ConnectedTodoCreate;
