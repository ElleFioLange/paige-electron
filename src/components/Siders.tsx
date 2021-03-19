
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  FileSearchOutlined,
  FileAddOutlined,
  StarOutlined,
  GroupOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface ISiderTemplate {
  menuItems: Jsx.Element[];
}

class SiderTemplate extends React.Component<ISiderTemplate> {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  render() {
    const { collapsed } = this.state;
    const { menuItems } = this.props;
    return (
      <Sider
        width={250}
        style={{ background: '#fff8d4', padding: '20px 0 0' }}
        collapsible
        collapsed={collapsed}
        onCollapse={() => this.setState({ collapsed: !collapsed })}
      >
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0, background: '#fff8d4' }}
        >
          <SubMenu key="favs" icon={<StarOutlined />} title="Favorites">
            <Menu.Item key="fav1">Fav 1</Menu.Item>
            <Menu.Item key="fav2">Fav 2</Menu.Item>
            <Menu.Item key="fav3">Fav 3</Menu.Item>
          </SubMenu>
          <SubMenu
            key="search-groups"
            icon={<GroupOutlined />}
            title="Set Current Group"
          >
            <Menu.Item key="group1">Group 1</Menu.Item>
            <Menu.Item key="group2">Group 2</Menu.Item>
            <Menu.Item key="group3">Group 3</Menu.Item>
          </SubMenu>
          {menuItems}
        </Menu>
      </Sider>
    );
  }
}

function SearchSider() {
  const menuItems = [];
  return <SiderTemplate menuItems={menuItems} />;
}

function FileSider() {
  const menuItems = [
    <Menu.Item icon={<FileAddOutlined />} key="add-file">
      Add File
    </Menu.Item>,
  ];

  return <SiderTemplate menuItems={menuItems} />;
}

function DocSider() {
  const menuItems = [
    <Menu.Item key="search" icon={<FileSearchOutlined />}>
      Search This Document
    </Menu.Item>,
  ];
  return <SiderTemplate menuItems={menuItems} />;
}

export default function SiderSwitch(key: string) {
  switch (key) {
    case 'search':
      return SearchSider();
    case 'files':
      return FileSider();
    default:
      return DocSider();
  }
}
