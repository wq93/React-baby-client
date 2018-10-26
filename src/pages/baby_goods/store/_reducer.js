import * as actionType from './actionType'
import {fromJS} from 'immutable';

const defaultState = fromJS({
  goodsList: [],
});

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}