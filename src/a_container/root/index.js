import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';
import '../../css/root.css';
const { Header, Content, Footer, Sider } = Layout;
// ==================
// Import Components
// ==================

// ==================
// Map store states to props
// ==================

const mapStoreStateToProps = (state) => ({
  dispatch: state.dispatch,
});

// ==================
// Definition
// ==================
const SubMenu = Menu.SubMenu;

class RootContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1',
      openKeys: [],
      viewHeight: 0
    };
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }
  onWindowResize (e) {
    this.setState({ viewHeight: document.body.clientHeight - document.getElementById("headerH").parentNode.style.height});
  }
  componentDidMount () {
    this.setState({ viewHeight: document.body.clientHeight - document.getElementById("headerH").parentNode.style.height});
  }
  handleClick (e) {
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
  }
  onOpenChange (openKeys) {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys (key) {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
  render() {
    return (
      <Layout>
        <Header><div id="headerH">header</div></Header>
        <Layout>
          <Sider>
            <Menu
              mode="inline"
              theme="dark"
              openKeys={this.state.openKeys}
              selectedKeys={[this.state.current]}
              style={{ width: '100%', height: this.state.viewHeight}}
              onOpenChange={this.onOpenChange.bind(this)}
              onClick={this.handleClick.bind(this)}
            >
              <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                <Menu.Item key="1"><Link to='/home'>home1</Link></Menu.Item>
                <Menu.Item key="2"><Link to='/home2'>home2</Link></Menu.Item>
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content>
            <div className="boss">
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

// ==================
// PropTypes
// ==================

RootContainer.propTypes = {
  dispatch: P.func,
  children: P.any,
};

// ==================
// Export
// ==================

export default connect(mapStoreStateToProps)(RootContainer);
