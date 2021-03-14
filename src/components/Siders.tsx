import React from 'react';
import { Layout, Menu } from 'antd';
import {
  FileSearchOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

function DocSider(
  collapsed: boolean,
  setCollapsed: (collapsed: boolean) => void
) {
  return (
    <Sider
      width={250}
      style={{ background: '#fff8d4', padding: '20px 0 0' }}
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0, background: '#fff8d4' }}
      >
        <Menu.Item
          key="search"
          icon={<FileSearchOutlined />}
          title="Search This Document"
        />
        <SubMenu key="edit" icon={<EditOutlined />} title="Edit">
          <Menu.Item key="new-edit">+ New Edit</Menu.Item>
          <Menu.ItemGroup key="edits" title="Edits">
            <Menu.Item key="edit1">Edit 1</Menu.Item>
            <Menu.Item key="edit2">Edit 2</Menu.Item>
            <Menu.Item key="edit3">Edit 3</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

function SearchSider(
  collapsed: boolean,
  setCollapsed: (collapsed: boolean) => void
) {
  return (
    <Sider
      width={250}
      style={{ background: '#fff8d4', padding: '20px 0 0' }}
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0, background: '#fff8d4' }}
      >
        <SubMenu key="search" icon={<SearchOutlined />} title="Search A Group">
          <Menu.ItemGroup key="groups" title="Groups">
            <Menu.Item key="group1">Group 1</Menu.Item>
            <Menu.Item key="group2">Group 2</Menu.Item>
            <Menu.Item key="group3">Group 3</Menu.Item>
            <Menu.Item key="new-group">+ New Group</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export { DocSider, SearchSider };
