import React, { useEffect } from "react"

const Notification = (props) => {
  const { notification, setNotification } = props

  useEffect(() => {
    setTimeout(() => {
      setNotification({ type: 0, message: "" })
    }, 3000)
  }, [setNotification])

  if (notification.type === 0) {
    return <div className="notification">{notification.message}</div>
  } else {
    return <div className="error">{notification.message}</div>
  }
}

export default Notification
