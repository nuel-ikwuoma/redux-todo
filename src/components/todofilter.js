import React from 'react';
import { connect } from 'react-redux';

import { doFilterTodo } from '../actionCreators';

/** COMPONENT TO FILTER TODOs */
function Filter({ onSetFilter }) {
  return (
    <div>
      Show{':'}
      <button type='button' onClick={() => onSetFilter('SHOW_ALL')}>
        All
      </button>
      <button type='button' onClick={() => onSetFilter('SHOW_COMPLETED')}>
        Completed
      </button>
      <button type='button' onClick={() => onSetFilter('SHOW_INCOMPLETED')}>
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

export default ConnectedTodoFilter;
