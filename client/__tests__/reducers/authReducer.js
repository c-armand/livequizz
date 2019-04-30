import authReducer, { initialState } from '../../src/reducers/authReducer'
import { SET_CURRENT_USER } from '../../src/actions/types'

const user = {
  id: "5cab897adf7488230c27908e",
  name: "Charles",
  iat: 1556642267,
  exp: 1556645867
}

describe('auth reducer', () => {

  it('has a default state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SET_CURRENT_USER', () => {
    expect(authReducer(undefined, {
      type: SET_CURRENT_USER,
      payload: user
    })).toEqual({
      ...initialState,
      isAuthenticated: true,
      user
    })
  })
})  