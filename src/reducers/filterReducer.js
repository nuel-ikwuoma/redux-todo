import { FILTER_SET  } from "../actionTypes";


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

export default filterReducer