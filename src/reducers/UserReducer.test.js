import expect from 'expect'
import reducer from './UserReducer'

describe('userReducer', () => {
  const defaultState = {
    userList: []
  }

  const expectedState = {
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
      },
      {
        id: '4',
        name: 'Caterina Binotto',
        email: 'caterina@mailinator.com',
        role: 'member'
      },
      {
        id: '5',
        name: 'Chetan Kumar',
        email: 'chetan@mailinator.com',
        role: 'member'
      },
      {
        id: '6',
        name: 'Jim McClain',
        email: 'jim@mailinator.com',
        role: 'member'
      }
    ]
  }

  it('sets default state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(defaultState)
  })

  it('SET_USER_DATA', () => {
    const prevState = Object.assign({}, defaultState)
    expect(
      reducer(prevState, {
        type: 'SET_USER_DATA',
        payload: expectedState.userList
      })
    ).toEqual(expectedState)
  })

  it('DELETE_USER', () => {
    const prevState = Object.assign({}, expectedState)
    const payloadData = '2'
    expect(
      reducer(prevState, { type: 'DELETE_USER', payload: payloadData }).userList
        .length
    ).toEqual(5)
  })

  it('DELETE_USER_SELECTED', () => {
    const prevState = Object.assign({}, expectedState)
    const payloadData = { 1: false, 3: true, 4: true }
    expect(
      reducer(prevState, { type: 'DELETE_USER_SELECTED', payload: payloadData })
        .userList.length
    ).toEqual(4)
  })

  it('UPDATE_USER', () => {
    const prevState = Object.assign({}, expectedState)
    const payloadData = {
      id: '2',
      name: 'Aishwarya',
      role: 'Admin'
    }
    expect(
      reducer(prevState, { type: 'UPDATE_USER', payload: payloadData })
        .userList[1].name
    ).toEqual('Aishwarya')
    expect(
      reducer(prevState, { type: 'UPDATE_USER', payload: payloadData })
        .userList[1].role
    ).toEqual('Admin')
  })
})
