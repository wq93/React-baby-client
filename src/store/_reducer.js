import {combineReducers} from 'redux-immutable'; // 提供的是immutable数据

import {reducer as babyGoodsReducer} from './baby_goods';
import {reducer as motherGoodsReducer} from '../pages/mother_goods/store';

const reducer = combineReducers({
  babyGoods: babyGoodsReducer,
  motherGoods: motherGoodsReducer,
});

export default reducer;