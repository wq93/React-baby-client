import axios from '../../../common/featch'
import * as actionType from './actionType'
import {message} from 'antd';

const GoodsList = (goodList) => ({
  type: actionType.GET_GOOD_LIST,
  goodList
})

const GoodDetail = (goodDetail) => ({
  type: actionType.CURRENT_GOOD_DETAIL,
  goodDetail
})

export const getGoodsList = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get('/getGoods')
      let {list, total, totalPrice} = res.data
      dispatch(GoodsList(list))
    } catch (e) {
      message.error('获取失败')
    }
  }
}

export const updataGoodDetail = (detail) => {
  return async (dispatch) => {
    try {
      let url = '/updateGood'
      let params = detail
      return await axios.put(url, params)
    } catch (e) {
      console.log(e)
    }
  }
}

export const currentGoodDetail = (view) => {
  return (dispatch) => {
    dispatch(GoodDetail(view))
  }
}