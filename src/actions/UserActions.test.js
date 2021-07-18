import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import expect from 'expect'
import * as actions from './UserListActions'

const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)

const mock = new MockAdapter(axios)

const store = mockStore({
  UserReducer: {
    userList: []
  }
})

describe('getUserData', () => {
  beforeEach(() => {
    store.clearActions()
  })
  it('returns SET_USER_DATA action', () => {
    const mockData = {
      userList: [
        {
          id: '1',
          name: 'Aaron Miles',
          email: 'aaron@mailinator.com',
          role: 'member'
        },
        {
          id: '2',
          name: 'Aishwarya Naik',
          email: 'aishwarya@mailinator.com',
          role: 'member'
        },
        {
          id: '3',
          name: 'Arvind Kumar',
          email: 'arvind@mailinator.com',
          role: 'admin'
        }
      ]
    }
    mock.onGet().reply(200, mockData.userList)
    return store.dispatch(actions.getUserData()).then(() => {
      const expectedActions = [
        {
          type: 'SET_USER_DATA',
          payload: mockData.userList
        }
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('deleteUserById', () => {
  it('returns DELETE_USER action', () => {
    const expectedAction = {
      type: 'DELETE_USER',
      payload: '2'
    }

    expect(actions.deleteUserById('2')).toEqual(expectedAction)
  })
})

describe('deleteUserById', () => {
  it('returns DELETE_USER action', () => {
    const expectedAction = {
      type: 'DELETE_USER',
      payload: '2'
    }

    expect(actions.deleteUserById('2')).toEqual(expectedAction)
  })
})

describe('deleteSelectedUsersById', () => {
  it('returns DELETE_USER_SELECTED action', () => {
    const expectedAction = {
      type: 'DELETE_USER_SELECTED',
      payload: { 1: true, 2: false }
    }

    expect(actions.deleteSelectedUsersById({ 1: true, 2: false })).toEqual(
      expectedAction
    )
  })
})

describe('updateUserById', () => {
  it('returns UPDATE_USER action', () => {
    const expectedAction = {
      type: 'UPDATE_USER',
      payload: {
        id: '2',
        name: 'Aishwarya',
        role: 'Admin'
      }
    }

    expect(
      actions.updateUserById({
        id: '2',
        name: 'Aishwarya',
        role: 'Admin'
      })
    ).toEqual(expectedAction)
  })
})
