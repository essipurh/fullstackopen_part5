const Notification = ({ notification }) => {

  return (
    <>
      {notification !== null  && <div className={notification.type}>{notification.text}</div>}
    </>
    
)}

export default Notification