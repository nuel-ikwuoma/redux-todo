import { TODO_ADD, NOTIFICATION_HIDE } from "../actionTypes";

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

export default notificationReducer