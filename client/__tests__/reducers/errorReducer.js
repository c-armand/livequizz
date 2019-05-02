import errorReducer, { initialState } from '../../src/reducers/errorReducer'
import { GET_ERRORS } from '../../src/actions/types'

describe('error reducer', () => {
  it('has a default state', () => {
    expect(errorReducer(undefined, {})).toEqual(initialState)
  })
  it('should handle GET_ERRORS', () => {
    expect(errorReducer(undefined, {
      type: GET_ERRORS,
      payload: { error: 'an error occured'}
    })).toEqual({
      error: 'an error occured'
    })
  })
})  