import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Modal} from 'antd';
import WrappedForm from './formModal'
import {actionCreators} from "../../../store/baby_goods";
import {message} from 'antd';

class Add extends Component {
  constructor(props) {
    super(props)
    this.handlerOk = this.handlerOk.bind(this)
    this.state = {
      confirmLoading: false,
    }
  }

  render() {
    const {handlerChangeAddModal, addModalvisible} = this.props
    return (
      <Modal
        title="新增"
        visible={addModalvisible}
        onOk={this.handlerOk}
        onCancel={handlerChangeAddModal}
        maskClosable={false}
        destroyOnClose={true}
        confirmLoading={this.state.confirmLoading}
        okText="确认"
        cancelText="取消"
      >
        <WrappedForm onRef={this.onRef} modalType={'addGood'}></WrappedForm>
      </Modal>
    )
  }

  onRef = (ref) => {
    this.child = ref
  }


  handlerOk() {
    const {addGoodDetail, handlerChangeAddModal, getGoodsList} = this.props
    let values = this.child.handleSubmit() // 使用子组件的方法
    if (values) {
      this.setState({
        confirmLoading: true,
      })
      addGoodDetail(values).then((resolve) => {
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
}


const mapDispatch = (dispatch) => ({
  addGoodDetail(detail) {
    return dispatch(actionCreators.addGoodDetail(detail))
  },
});

export default connect(null, mapDispatch)(Add)
