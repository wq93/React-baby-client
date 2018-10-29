import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Modal} from 'antd';
import WrappedForm from './formModal'
import {actionCreators} from "../store";
import {message} from 'antd';

class Edit extends Component {
  constructor(props) {
    super(props)
    this.handlerOk = this.handlerOk.bind(this)
    this.state = {
      confirmLoading: false,
    }
  }

  render() {
    const {handlerChangeAddModal, visible} = this.props
    return (
      <Modal
        title="新增"
        visible={visible}
        onOk={this.handlerOk}
        onCancel={handlerChangeAddModal}
        maskClosable={false}
        destroyOnClose={true}
        confirmLoading={this.state.confirmLoading}
        okText="确认"
        cancelText="取消"
      >
        <WrappedForm onRef={this.onRef} modalType={'editGood'}></WrappedForm>
      </Modal>
    )
  }

  onRef = (ref) => {
    this.child = ref
  }


  handlerOk() {
    const {updataGoodDetail, handlerChangeAddModal, getGoodsList} = this.props
    let values = this.child.handleSubmit() // 使用子组件的方法
    this.setState({
      confirmLoading: true,
    });
    values && updataGoodDetail(values).then((resolve) => {
      let {code, data} = resolve
      setTimeout(() => {
        this.setState({
          confirmLoading: false,
        })
        handlerChangeAddModal()
        code === 0 ? message.success('保存成功') : message.error(data.msg)
        getGoodsList()
      }, 300)
    })
  }
}

const mapState = (state) => ({
  updataGoodState: state.getIn(['babyGoods', 'updataGoodState']),
});
const mapDispatch = (dispatch) => ({
  updataGoodDetail(detail) {
    return dispatch(actionCreators.updataGoodDetail(detail))
  },
});

export default connect(mapState, mapDispatch)(Edit)
