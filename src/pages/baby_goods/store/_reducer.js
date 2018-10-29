import * as actionType from './actionType'
import {fromJS} from 'immutable';

const defaultState = fromJS({
  goodsList: [],
  currentGoodDetail: {}
});


const setGoodsList = (state, action) => {
  return state.merge({
    goodsList: fromJS(action.goodList),
  });
};

const setGoodDetail = (state, action) => {
  return state.merge({
    currentGoodDetail: fromJS(action.goodDetail),
  });
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionType.GET_GOOD_LIST:
      return setGoodsList(state, action)
    case actionType.CURRENT_GOOD_DETAIL:
      return setGoodDetail(state, action)
    default:
      return state
  }
}