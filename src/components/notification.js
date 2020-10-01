import React from 'react';
import { connect } from 'react-redux';
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

const getNotifications = (state) => getArrayOfObject(state.notificationState);

const getArrayOfObject = (object) =>
  Object.keys(object).map((key) => object[key]);
  
const ConnectedNotification = connect(mapStateToPropsNotifications)(
  Notifications
);

export default ConnectedNotification;
