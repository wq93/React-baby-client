import {fromJS} from 'immutable'
import * as actionType from './actionType'

const defaultState = fromJS({
  goodsList: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}