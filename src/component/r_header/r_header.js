import React, {Component} from 'react';
import {Menu, Avatar, Divider} from 'antd';
import './r_header.less'

export default class HeaderNav extends Component {
  render() {
    return (
      <div className='header-nav-wrapper'>
        <div className="header-logo">
          logo
        </div>
        <div className="header-menu">
          <div>
            <a href="/">首页</a>
            <Divider type="vertical"/>
            <a href="/baby">宝宝</a>
            <Divider type="vertical"/>
            <a href="/">文章</a>
          </div>
        </div>
        <div>
          <Avatar style={{backgroundColor: '#87d068'}} icon="user"/>
          <span>name</span>
        </div>
      </div>
    )
  }
}