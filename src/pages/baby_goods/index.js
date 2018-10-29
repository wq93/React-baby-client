import React, {Component} from 'react'
import axios from '../../common/featch'
import {Button, Modal, Table, Divider, Tag, message} from 'antd';
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {goodType, sourceType} from '../../common/config'
import {edit} from './component/edit'
import Edit from "./component/edit";
import Add from "./component/add";
import './index.less'

const confirm = Modal.confirm;

class Baby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      addModalvisible: false
    }
    this.handlerClickEdit = this.handlerClickEdit.bind(this)
    this.handlerClickRemove = this.handlerClickRemove.bind(this)
    this.handlerChangeAddModal = this.handlerChangeAddModal.bind(this)
    this.handlerChangeEditModal = this.handlerChangeEditModal.bind(this)
  }

  componentDidMount() {
    this.props.getGoodsList()
  }

  render() {
    const {goodsList} = this.props
    const columns = [
      {
        title: '商品',
        dataIndex: 'displayName',
        key: 'displayName',
        render: text => <a href='javascript:;'>{text}</a>,
      },
      {
        title: '数量',
        dataIndex: 'count',
        key: 'count',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '类别',
        dataIndex: 'showType',
        key: 'showType',
        render: text => (
          <span>{<Tag color='blue' key={text}>{text}</Tag>}</span>
        ),
      },
      {
        title: '来源',
        dataIndex: 'showSource',
        key: 'showSource',
        render: text => (
          <span>{<Tag color='blue' key={text}>{text}</Tag>}</span>
        ),
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '操作',
        key: 'action',
        width: 160,
        render: (record) => (
          <span>
          <a href='javascript:;' onClick={() => this.handlerClickEdit(record)}>编辑</a>
          <Divider type="vertical"/>
          <a href='javascript:;' onClick={() => this.handlerClickRemove(record)}>删除</a>
    </span>
        ),
      }];
    const data = serializetionData(goodsList.toJS())
    return (
      <div className="baby-goods-wrapper">
        <Button className='baby-goods-add'
                type="primary"
                icon="plus-circle"
                onClick={() => {
                  this.handlerChangeAddModal()
                }}>新增</Button>
        <Table rowKey="uuid"
               columns={columns}
               dataSource={data}/>
        {this.state.visible ?
          <Edit visible={this.state.visible}
                handlerChangeEditModal={this.handlerChangeEditModal}
                getGoodsList={this.props.getGoodsList}></Edit> : ''}
        {this.state.addModalvisible ?
          <Add addModalvisible={this.state.addModalvisible}
               handlerChangeAddModal={this.handlerChangeAddModal}
               getGoodsList={this.props.getGoodsList}></Add> : ''}
      </div>
    )
  }

  handlerClickEdit(record) {
    this.props.currentGoodDetail(record)
    this.handlerChangeEditModal()
  }

  handlerClickRemove({uuid}) {
    confirm({
      title: '删除',
      content: '确认删除此商品吗?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: function () {
        return new Promise(async resolve => {
          try {
            let url = `deleteGood?uuid=${uuid}`
            let res = await axios({
              method: 'delete',
              url,
            })
            res.code === 0 ? message.success('删除成功') : message.error('删除失败')
          } finally {
            setTimeout(resolve)
            this.props.getGoodsList()
          }
        })
      }.bind(this),
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handlerChangeEditModal() {
    this.setState({
      visible: !this.state.visible
    })
  }

  handlerChangeAddModal() {
    this.setState({
      addModalvisible: !this.state.addModalvisible
    })
  }
}

const serializetionData = (list) => {
  list.forEach(item => {
    let type = goodType[item.type]
    let source = sourceType[item.source]
    item.showType = type
    item.showSource = source
  })
  return list
}

const mapState = (state) => ({
  goodsList: state.getIn(['babyGoods', 'goodsList']),
});
const mapDispatch = (dispatch) => ({
  getGoodsList() {
    dispatch(actionCreators.getGoodsList())
  },
  currentGoodDetail(view) {
    dispatch(actionCreators.currentGoodDetail(view))
  }
});

export default connect(mapState, mapDispatch)(Baby)