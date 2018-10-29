import React from 'react'
import {Form, Select, Input, InputNumber, Button} from 'antd';
import {connect} from 'react-redux';

const FormItem = Form.Item;
const Option = Select.Option;

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = () => {
    const {currentGoodDetail, modalType} = this.props
    const {uuid} = currentGoodDetail.toJS()
    let formData
    this.props.form.validateFields((err, values) => {
      if (!err) {
        formData = values
        modalType === 'editGood' && (formData.uuid = uuid)
      } else {
        formData = false
      }
    });
    return formData
  }

  componentDidMount() {
    const {currentGoodDetail, modalType} = this.props
    const {displayName, count, price, source, type, remark} = currentGoodDetail.toJS()
    this.props.onRef(this)
    this.props.form.setFieldsValue(modalType === 'addGood' ?
      {
        count: 1,
        source: '1',
        type: '1',
      } : {displayName, count, price, source, type, remark});
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form>
        <FormItem
          label="名称:"
          labelCol={{span: 5}}
          wrapperCol={{span: 12}}
        >
          {getFieldDecorator('displayName', {
            rules: [{required: true, message: 'Please input your displayName!'}],
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          label="数量:"
          labelCol={{span: 5}}
          wrapperCol={{span: 12}}
        >
          {getFieldDecorator('count', {
            rules: [{required: true, message: 'Please input your count!'}],
          })(
            <InputNumber min={1}/>
          )}
        </FormItem>
        <FormItem
          label="价格:"
          labelCol={{span: 5}}
          wrapperCol={{span: 12}}
        >
          {getFieldDecorator('price', {
            rules: [{required: true, message: 'Please input your price!'}],
          })(
            <InputNumber min={1}/>
          )}
        </FormItem>
        <FormItem
          label="来源:"
          labelCol={{span: 5}}
          wrapperCol={{span: 12}}
        >
          {getFieldDecorator('source', {
            rules: [{required: true, message: 'Please select your gender!'}],
          })(
            <Select
              placeholder="Select a source"
            >
              <Option value="1">京东</Option>
              <Option value="2">淘宝</Option>
              <Option value="3">其他</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="类别:"
          labelCol={{span: 5}}
          wrapperCol={{span: 12}}
        >
          {getFieldDecorator('type', {
            rules: [{required: true, message: 'Please select your type!'}],
          })(
            <Select
              placeholder="Select a type"
            >
              <Option value="1">日常</Option>
              <Option value="2">洗浴</Option>
              <Option value="3">出行</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="备注(品牌):"
          labelCol={{span: 5}}
          wrapperCol={{span: 12}}
        >
          {getFieldDecorator('remark')(
            <textarea/>
          )}
        </FormItem>
      </Form>
    );
  }
}

const WrappedForm = Form.create()(App);

const mapState = (state) => ({
  currentGoodDetail: state.getIn(['babyGoods', 'currentGoodDetail']),
});


export default connect(mapState, null)(WrappedForm)