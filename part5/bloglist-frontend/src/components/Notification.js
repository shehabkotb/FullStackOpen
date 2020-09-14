import React from "react"

const Notification = (props) => {
  const notification = props.notification
  const setNotification = props.setNotification

  if (notification != null) {
    setTimeout(() => {
      setNotification(null)
    }, 5000)

    const notificationType =
      notification.type === "success" ? "alert success" : "alert danger"

    console.log(notification.message)

    return <div className={notificationType}> {notification.message} </div>
  }

  return null
}

export default Notification
