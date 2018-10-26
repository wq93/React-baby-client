import axios from '../../../common/featch'
import * as actionType from './actionType'

const GoodsList = (goodList) => ({
  type: actionType.GET_GOOD_LIST,
  goodList
})

export const getGoodsList = () => {
  return async (dispatch) => {
    try {
      let {list, total, totalPrice} = await axios.get('/getGoods')
      dispatch(GoodsList(list))
    } catch (e) {
      console.log(e)
    } finally {

    }

  }
}