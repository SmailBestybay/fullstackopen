import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });

  return (
    <>
      {notification.message && (
        <div className={notification.status}>{notification.message}</div>
      )}
    </>
  );
};

export default Notification;
