import React, {Component} from 'react';
import {Provider} from 'react-redux'
import store from './store'
import {Layout, Menu, Breadcrumb} from 'antd';
import RouterView from './router'
import RHeader from './component/r_header/r_header'


const {Header, Content, Footer} = Layout;

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Header>
            <RHeader></RHeader>
          </Header>
          <Content>
            <div className='content-wrapper'>
              <RouterView></RouterView>
            </div>
          </Content>
        </Layout>
      </Provider>
    );
  }
}

export default App
