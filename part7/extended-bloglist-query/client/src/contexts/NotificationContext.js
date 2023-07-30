import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return { message: action.message, status: action.status };
    case "CLEAR":
      return { message: null, status: "" };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: "",
    status: "",
  });

  const notifyWith = (message, status = "info") => {
    notificationDispatch({
      type: "SET",
      message,
      status,
    });

    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 3000);
  };

  return (
    <NotificationContext.Provider
      value={[notification, notificationDispatch, notifyWith]}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const useNotify = () => {
  const context = useContext(NotificationContext);
  return context[2];
};

export default NotificationContext;
