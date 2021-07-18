import React, { useEffect } from 'react'
import './App.css'
import {
  Route,
  HashRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom'
import UserTable from './UserTable/UserTable'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteUserById,
  getUserData,
  updateUserById,
  deleteSelectedUsersById
} from '../actions/UserListActions'
import { createConfirmAction } from '../actions/pendingConfirmationActions'

function App () {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.UserReducer.userList)

  const documentObject = document.body.classList
  axios.interceptors.request.use(
    function (config) {
      documentObject.add('loading-indicator')
      return new Promise((resolve, reject) => {
        resolve(config)
      })
    },
    function (error) {
      documentObject.remove('loading-indicator')
      return new Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    function (response) {
      documentObject.remove('loading-indicator')
      return response
    },
    async function (error) {
      documentObject.remove('loading-indicator')
      documentObject.remove('error-indicator')
      return new Promise.reject(error)
    }
  )

  useEffect(() => {
    dispatch(getUserData())
  }, [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <UserTable
              userList={userList}
              onUpdate={(editedRow) => {
                const confirmSaveItemAction = createConfirmAction({
                  pendingConfirmationAction: updateUserById(editedRow),
                  msg: 'Do you want to save the changes?',
                  confirmButtonTxt: 'Yes, Save',
                  cancelButtonTxt: 'No, Cancel'
                })
                dispatch(confirmSaveItemAction)
              }}
              onDeleteSelected={(idArray) => {
                const confirmSaveItemAction = createConfirmAction({
                  pendingConfirmationAction: deleteSelectedUsersById(idArray),
                  msg: 'Do you want to delete selected users?',
                  confirmButtonTxt: 'Yes, Delete',
                  cancelButtonTxt: 'No, Cancel'
                })
                dispatch(confirmSaveItemAction)
              }}
              onDelete={(id) => {
                const confirmDeleteItemAction = createConfirmAction({
                  pendingConfirmationAction: deleteUserById(id),
                  msg: 'Are you sure you want to delete?',
                  confirmButtonTxt: 'Yes, Delete',
                  cancelButtonTxt: 'No, Cancel'
                })
                dispatch(confirmDeleteItemAction)
              }}
            />
          </Route>
          <Route render={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
