import React, {Component} from 'react';
import {Provider} from 'react-redux'
import store from './store'
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import RouterView from './router'

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class App extends React.Component {
  state = {
    collapsed: true,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({collapsed});
  }

  render() {
    return (
      <Provider store={store}>
        <Layout style={{minHeight: '100vh'}}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="pie-chart"/>
                <span>首页</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={<span><Icon type="user"/><span>商品</span></span>}
              >
                <Menu.Item key="3">宝贝</Menu.Item>
                <Menu.Item key="4">宝妈</Menu.Item>
              </SubMenu>
              {/*<SubMenu*/}
              {/*key="sub2"*/}
              {/*title={<span><Icon type="team"/><span>Team</span></span>}*/}
              {/*>*/}
              {/*<Menu.Item key="6">Team 1</Menu.Item>*/}
              {/*<Menu.Item key="8">Team 2</Menu.Item>*/}
              {/*</SubMenu>*/}
              {/*<Menu.Item key="9">*/}
              {/*<Icon type="file"/>*/}
              {/*<span>File</span>*/}
              {/*</Menu.Item>*/}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{background: '#fff', padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
              <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                <RouterView></RouterView>
              </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
              WangQi and WangFang ©2018 Created in BeiJing
            </Footer>
          </Layout>
        </Layout>
      </Provider>
    );
  }
}

export default App
