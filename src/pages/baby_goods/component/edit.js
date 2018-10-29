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
    const {handlerChangeEditModal, visible} = this.props
    return (
      <Modal
        title="编辑"
        visible={visible}
        onOk={this.handlerOk}
        onCancel={handlerChangeEditModal}
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
    const {updataGoodDetail, handlerChangeEditModal, getGoodsList} = this.props
    let values = this.child.handleSubmit() // 使用子组件的方法
    if (values) {
      this.setState({
        confirmLoading: true,
      });
      updataGoodDetail(values).then((resolve) => {
        let {code, data} = resolve
        setTimeout(() => {
          this.setState({
            confirmLoading: false,
          })
          handlerChangeEditModal()
          code === 0 ? message.success('保存成功') : message.error(data.msg)
          getGoodsList()
        }, 300)
      })
    }
  }
}

const mapDispatch = (dispatch) => ({
  updataGoodDetail(detail) {
    return dispatch(actionCreators.updataGoodDetail(detail))
  },
});

export default connect(null, mapDispatch)(Edit)
