import React from 'react'
import App from './App'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import 'regenerator-runtime/runtime'
import * as actions from '../actions/UserListActions'

const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)
configure({ adapter: new Adapter() })

describe('App', () => {
  const store = mockStore({
    UserReducer: {
      userList: []
    }
  })
  const getUserDataSpy = jest.spyOn(actions, 'getUserData')
  const app = mount(
    <Provider store={store}>
      <App />
    </Provider>
  )
  expect(getUserDataSpy).toHaveBeenCalled()
  describe('App content', () => {
    it('should render App component', () => {
      expect(app.find('.App').length).toEqual(1)
    })
  })
})
