import httpClient from '../httpClient/httpClient'

export function getUserData () {
  return function (dispatch, getState) {
    const url =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    return httpClient
      .get({
        path: url,
        params: {}
      })
      .then((res) => {
        return dispatch({
          type: 'SET_USER_DATA',
          payload: res.data?.sort(function (a, b) {
            return Number(a.id) > Number(b.id)
              ? 1
              : Number(a.id) < Number(b.id)
                ? -1
                : 0
          })
        })
      })
  }
}

export function deleteUserById (id) {
  return {
    type: 'DELETE_USER',
    payload: id
  }
}

export function deleteSelectedUsersById (idArray) {
  return {
    type: 'DELETE_USER_SELECTED',
    payload: idArray
  }
}

export function updateUserById (editedRow) {
  return {
    type: 'UPDATE_USER',
    payload: editedRow
  }
}
