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

export const setNotification = (notification, duration) => {
  return async (dispatch) => {
    dispatch({ type: "SET_NOTIFICATION", data: { notification } })
    setTimeout(() => dispatch(removeNotification()), duration * 1000)
  }
}

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION"
  }
}

export default notificationReducer
