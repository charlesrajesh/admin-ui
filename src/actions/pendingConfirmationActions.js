export const createConfirmAction = ({
  pendingConfirmationAction,
  msg,
  confirmButtonTxt,
  cancelButtonTxt
}) => {
  return {
    type: 'REQUEST_CONFIRMATION',
    pendingConfirmationAction,
    msg,
    confirmButtonTxt,
    cancelButtonTxt
  }
}

export const cancelConfirmation = () => {
  return {
    type: 'CANCEL_CONFIRMATION'
  }
}

export const confirmPendingAction = () => {
  return (dispatch, getState) => {
    const cancelConfirmationAction = cancelConfirmation()
    if (getState().pendingConfirmationReducer) {
      const pendingConfirmAction =
        getState().pendingConfirmationReducer.pendingConfirmationAction
      dispatch(pendingConfirmAction)
      dispatch(cancelConfirmationAction)
    } else {
      dispatch(cancelConfirmationAction)
    }
  }
}
