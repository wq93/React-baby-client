import React, {Component} from 'react'
import {Button, Table, Divider, Tag} from 'antd';
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {goodType, sourceType} from '../../common/config'
import {edit} from './component/edit'
import Edit from "./component/edit";
import './index.less'

class Baby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.handlerClickEdit = this.handlerClickEdit.bind(this)
    this.handlerClickRemove = this.handlerClickRemove.bind(this)
    this.handlerChangeAddModal = this.handlerChangeAddModal.bind(this)
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
        dataIndex: 'type',
        key: 'type',
        render: text => (
          <span>{<Tag color='blue' key={text}>{text}</Tag>}</span>
        ),
      },
      {
        title: '来源',
        dataIndex: 'source',
        key: 'source',
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
                handlerChangeAddModal={this.handlerChangeAddModal}></Edit> : ''}
      </div>
    )
  }

  handlerClickEdit(record) {
    this.props.currentGoodDetail(record)
    this.handlerChangeAddModal()
  }

  handlerClickRemove(record) {
    console.log('handlerClickRemove', record)
  }

  handlerChangeAddModal() {
    this.setState({
      visible: !this.state.visible
    })
  }
}

const serializetionData = (list) => {
  list.forEach(item => {
    let type = goodType[item.type]
    let source = sourceType[item.source]
    item.type = type
    item.source = source
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