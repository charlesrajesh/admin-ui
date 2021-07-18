const defaultState = {
  userList: []
}
export default function UserReducer (state = defaultState, action) {
  switch (action.type) {
    case 'SET_USER_DATA': {
      const newState = JSON.parse(JSON.stringify(state))
      newState.userList = action.payload
      return newState
    }
    case 'DELETE_USER': {
      const newState = JSON.parse(JSON.stringify(state))
      const removeIndex = newState.userList
        .map((item) => item.id)
        .indexOf(action.payload)
      ~removeIndex && newState.userList.splice(removeIndex, 1)
      return newState
    }
    case 'DELETE_USER_SELECTED': {
      const newState = JSON.parse(JSON.stringify(state))
      const removeIndexes = Object.keys(action.payload).filter(
        (key) => action.payload[key] === true
      )
      const toDelete = new Set(removeIndexes)
      newState.userList = newState.userList.filter(
        (obj) => !toDelete.has(obj.id)
      )
      return newState
    }
    case 'UPDATE_USER': {
      const newState = JSON.parse(JSON.stringify(state))
      const userIndex = newState.userList
        .map((item) => item.id)
        .indexOf(action.payload.id)
      if (action.payload.email) {
        newState.userList[userIndex].email = action.payload.email
      }
      if (action.payload.name) {
        newState.userList[userIndex].name = action.payload.name
      }
      if (action.payload.role) {
        newState.userList[userIndex].role = action.payload.role
      }
      return newState
    }
    default:
      return state
  }
}
