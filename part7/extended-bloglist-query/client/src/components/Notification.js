// import { useSelector } from "react-redux";
import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  // const notification = useSelector((state) => {
  //   return state.notification;
  // });

  const notification = useNotificationValue();

  return (
    <>
      {notification.message && (
        <div className={notification.status}>{notification.message}</div>
      )}
    </>
  );
};

export default Notification;
