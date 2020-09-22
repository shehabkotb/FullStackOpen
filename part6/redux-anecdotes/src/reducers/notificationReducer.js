const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.notification
    case "REMOVE_NOTIFICATION":
      return null
    default:
      return state
  }
}

let timeOutID
export const setNotification = (notification, duration) => {
  return async (dispatch) => {
    if (timeOutID !== undefined) clearTimeout(timeOutID)
    dispatch(removeNotification())
    dispatch({ type: "SET_NOTIFICATION", data: { notification } })
    timeOutID = setTimeout(
      () => dispatch(removeNotification()),
      duration * 1000
    )
  }
}

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION"
  }
}

export default notificationReducer
