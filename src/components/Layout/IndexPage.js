import React,{Component} from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {Layout, Menu, Icon} from 'antd'

const {Sider, Content} = Layout
class IndexPage extends Component{
  state = {
    collapsed: false,
  };
  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render(){
    return (
      <Layout className="g-bg">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/info"><Icon type="user" />介绍</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/info"><Icon type="video-camera" />nav2</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/info"><Icon type="upload" />nav3</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: 24}}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
