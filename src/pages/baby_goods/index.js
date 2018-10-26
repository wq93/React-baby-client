import React, {Component} from 'react'
import {Table, Divider, Tag} from 'antd';
import {connect} from 'react-redux';
import {actionCreators} from './store';

class Baby extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getGoodsList()
  }

  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
      {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
    </span>
      ),
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
      <a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical"/>
      <a href="javascript:;">Delete</a>
    </span>
      ),
    }];

    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    }];
    console.log(this.props.goodsList)
    return (<Table columns={columns} dataSource={data}/>)
  }
}

const mapState = (state) => ({
  goodsList: state.getIn(['babyGoods', 'goodsList']),
});

const mapDispatch = (dispatch) => ({
  getGoodsList() {
    dispatch(actionCreators.getGoodsList())
  }
});

export default connect(mapState, mapDispatch)(Baby)