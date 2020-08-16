import React, { useEffect } from "react"

const Notification = (props) => {
  const { notification, setNotification } = props

  useEffect(() => {
    setTimeout(() => {
      setNotification({ type: 0, message: "" })
    }, 3000)
  }, [])

  if (notification.type === 0) {
    return (
      <div className="notification">{notification.message} Contact added</div>
    )
  } else {
    return (
      <div className="error">{notification.message} is not found on server</div>
    )
  }
}

export default Notification
