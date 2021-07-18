const pendingConfirmationReducer = (state = null, action) => {
  switch (action.type) {
    case 'REQUEST_CONFIRMATION':
      const {
        pendingConfirmationAction,
        msg,
        confirmButtonTxt,
        cancelButtonTxt
      } = action
      return {
        pendingConfirmationAction,
        msg,
        confirmButtonTxt,
        cancelButtonTxt
      }
    case 'CANCEL_CONFIRMATION':
    case 'CONFIRM':
      return null
    default:
      return state
  }
}

export default pendingConfirmationReducer
