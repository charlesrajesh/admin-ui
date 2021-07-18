import React from 'react'
import UserTable from './UserTable'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import 'regenerator-runtime/runtime'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)
const mock = new MockAdapter(axios)
configure({ adapter: new Adapter() })

describe('UserTable', () => {
  const deleteSpy = jest.fn()
  const deleteSelectedSpy = jest.fn()
  const updateSpy = jest.fn()

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
      }
    ]
  }
  const store = mockStore({
    UserReducer: {
      userList: mockData.userList
    }
  })
  const userTable = mount(
    <Provider store={store}>
      <UserTable
        userList={mockData.userList}
        onDelete={deleteSpy}
        onDeleteSelected={deleteSelectedSpy}
        onUpdate={updateSpy}
      />
    </Provider>
  )
  describe('UserTable content', () => {
    it('should render UserTable component', () => {
      expect(userTable.find('.userTable').length).toEqual(1)
    })
    it('should render user table', () => {
      expect(userTable.find('table').length).toEqual(1)
      const header = userTable
        .find('table thead')
        .find('tr')
        .at(0)
        .find('th')
        .map((th) => {
          return th.text()
        })

      expect(header.length).toEqual(5)
      expect(header[0]).toEqual('')
      expect(header[1]).toEqual('User Name')
      expect(header[2]).toEqual('Email')
      expect(header[3]).toEqual('Role')
      expect(header[4]).toEqual('Actions')
      expect(
        userTable.find('table').at(0).find('tbody').at(0).find('tr').length
      ).toBe(2)
      expect(
        userTable
          .find('table')
          .at(0)
          .find('tbody')
          .find('tr')
          .at(0)
          .find('td')
          .at(1)
          .text()
      ).toEqual('Aaron Miles')
      expect(
        userTable
          .find('table')
          .at(0)
          .find('tbody')
          .find('tr')
          .at(0)
          .find('td')
          .at(2)
          .text()
      ).toEqual('aaron@mailinator.com')
      expect(
        userTable
          .find('table')
          .at(0)
          .find('tbody')
          .find('tr')
          .at(0)
          .find('td')
          .at(3)
          .text()
      ).toEqual('member')
      expect(
        userTable
          .find('table')
          .at(0)
          .find('tbody')
          .find('tr')
          .at(0)
          .find('td')
          .at(4)
          .find('img').length
      ).toBe(2)
    })
  })
  describe('UserTable delete selected action', () => {
    it('should render delete selected', () => {
      userTable
        .find('table')
        .at(0)
        .find('tbody')
        .find('tr')
        .at(0)
        .find('td')
        .at(4)
        .find('img')
        .at(1)
        .simulate('click')
      expect(deleteSpy).toHaveBeenCalled()
    })
  })
  describe('UserTable delete selected action', () => {
    it('should render UserTable component', () => {
      userTable.find('button.btn.btn-danger').simulate('click')
      expect(deleteSelectedSpy).toHaveBeenCalled()
    })
  })
  describe('UserTable update action', () => {
    it('should render call update spy', () => {
      const editIcon = userTable
        .find('table')
        .at(0)
        .find('tbody')
        .find('tr')
        .at(0)
        .find('td')
        .at(4)
        .find('img')
        .at(0)
      expect(
        userTable
          .find('table')
          .at(0)
          .find('tbody')
          .find('tr')
          .at(0)
          .find('td')
          .at(2)
          .find('input').length
      ).toBe(0)
      editIcon.simulate('click')
      expect(
        userTable
          .find('table')
          .at(0)
          .find('tbody')
          .find('tr')
          .at(0)
          .find('td')
          .at(2)
          .find('input').length
      ).toBe(1)
      editIcon.simulate('click')
      expect(updateSpy).toHaveBeenCalled()
    })
  })
  describe('UserTable update action', () => {
    it('should render call update spy', () => {
      const selectAllIcon = userTable
        .find('table thead')
        .find('tr')
        .at(0)
        .find('th')
        .find('input')
      expect(selectAllIcon.length).toBe(1)
      expect(
        userTable
          .find('table')
          .at(0)
          .find('tbody')
          .find('tr')
          .at(0)
          .find('td')
          .at(0)
          .find('input')
          .props().checked
      ).toEqual(false)
      expect(
        userTable
          .find('table')
          .at(0)
          .find('tbody')
          .find('tr')
          .at(1)
          .find('td')
          .at(0)
          .find('input')
          .props().checked
      ).toEqual(false)

      selectAllIcon.simulate('change', { target: { checked: true } })
      expect(
        userTable
          .find('table')
          .at(0)
          .find('tbody')
          .find('tr')
          .at(0)
          .find('td')
          .at(0)
          .find('input')
          .props().checked
      ).toEqual(true)
      expect(
        userTable
          .find('table')
          .at(0)
          .find('tbody')
          .find('tr')
          .at(1)
          .find('td')
          .at(0)
          .find('input')
          .props().checked
      ).toEqual(true)
    })
  })
})
