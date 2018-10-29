import React, {Component} from 'react'
import {Modal} from 'antd';
import WrappedForm from './formModal'

class Edit extends Component {
  constructor(props) {
    super(props)
    this.handlerOk = this.handlerOk.bind(this)
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
        okText="确认"
        cancelText="取消"
      >
        <WrappedForm onRef={this.onRef} modalType={'editGood'}></WrappedForm>
      </Modal>
    )
  }

  conponentDidMount() {

  }

  onRef = (ref) => {
    this.child = ref
  }


  handlerOk() {
    let values = this.child.handleSubmit() // 使用子组件的方法
    values && this.props.handlerChangeAddModal()
  }
}

export default Edit