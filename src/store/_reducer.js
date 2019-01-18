import {combineReducers} from 'redux-immutable'; // 提供的是immutable数据

import {reducer as babyGoodsReducer} from './baby_goods';

const reducer = combineReducers({
  babyGoods: babyGoodsReducer,

});

export default reducer;