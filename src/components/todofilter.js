import React from 'react';
import { connect } from 'react-redux';

import { doFilterTodo } from '../actionCreators';

/** COMPONENT TO FILTER TODOs */
function Filter({ filterState, onSetFilter }) {
  console.log('filterState', filterState);
  return (
    <div>
      Show{':'}
      <button
        className={filterState === 'SHOW_ALL' ? 'current' : null + ' filter'}
        type='button'
        onClick={() => onSetFilter('SHOW_ALL')}
      >
        All
      </button>
      <button
        className={filterState === 'SHOW_COMPLETED' ? 'current' : null + ' filter'}
        type='button'
        onClick={() => onSetFilter('SHOW_COMPLETED')}
      >
        Completed
      </button>
      <button
        className={filterState === 'SHOW_INCOMPLETED' ? 'current' : null + ' filter'}
        type='button'
        onClick={() => onSetFilter('SHOW_INCOMPLETED')}
      >
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

function mapStateToPropsFilter({filterState}) {
  return {
    filterState,
  };
}

const ConnectedTodoFilter = connect(
  mapStateToPropsFilter,
  mapDispatchToPropsFilter
)(Filter);

export default ConnectedTodoFilter;
