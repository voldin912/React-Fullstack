const Notification = ({ status = "", message = "" }) => {
  return (
    <div
      className={`notification ${status}`}
    >
      {message}
    </div>
  );
};
export default Notification;
