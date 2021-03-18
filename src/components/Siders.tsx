import React from 'react';
import { Button, Layout, Menu } from 'antd';
import {
  FileSearchOutlined,
  FileAddOutlined,
  StarOutlined,
  EditOutlined,
  SearchOutlined,
  GroupOutlined,
  DeleteOutlined,
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
        <Menu.Item key="search" icon={<FileSearchOutlined />}>
          Search This Document
        </Menu.Item>
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
        <SubMenu
          key="search-groups"
          icon={<GroupOutlined />}
          title="Set Current Group"
        >
          <Menu.Item key="group1">Group 1</Menu.Item>
          <Menu.Item key="group2">Group 2</Menu.Item>
          <Menu.Item key="group3">Group 3</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

function FileSider(
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
        <Menu.Item icon={<FileAddOutlined />} key="add-file">
          Add File
        </Menu.Item>
        <Menu.Item icon={<DeleteOutlined />} key="delete-file">
          Delete
        </Menu.Item>
        <Menu.Item icon={<EditOutlined />} key="rename-file">
          Rename
        </Menu.Item>
        <SubMenu key="favorites" icon={<StarOutlined />} title="Favorites">
          <Menu.Item key="fav1">Favorite 1</Menu.Item>
          <Menu.Item key="fav2">Favorite 2</Menu.Item>
          <Menu.Item key="fav3">Favorite 3</Menu.Item>
        </SubMenu>
        <SubMenu
          key="file-groups"
          icon={<GroupOutlined />}
          title="Manage Groups"
        >
          <Menu.Item key="new-group">+ New Group</Menu.Item>
          <Menu.ItemGroup key="groups" title="Groups">
            <Menu.Item key="group1">Group 1</Menu.Item>
            <Menu.Item key="group2">Group 2</Menu.Item>
            <Menu.Item key="group3">Group 3</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export { DocSider, SearchSider, FileSider };
