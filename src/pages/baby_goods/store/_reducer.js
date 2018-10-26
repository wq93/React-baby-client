import * as actionType from './actionType'
import {fromJS} from 'immutable';

const defaultState = fromJS({
  goodsList: [],
});


const setGoodsList = (state, action) => {
  return state.merge({
    goodsList: fromJS(action.goodList),
  });
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionType.GET_GOOD_LIST:
      return setGoodsList(state, action)
    default:
      return state
  }
}