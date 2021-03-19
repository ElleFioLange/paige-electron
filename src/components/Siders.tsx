import React from 'react';
import { Layout, Menu } from 'antd';
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

function SiderTemplate(
  collapsed: boolean,
  setCollapsed: (collapsed: boolean) => void,
  menuItems: Jsx.Element[]
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
        {menuItems}
      </Menu>
    </Sider>
  );
}

function DocSider(
  collapsed: boolean,
  setCollapsed: (collapsed: boolean) => void
) {
  const menuItems = [
    <SubMenu key="favs" icon={<StarOutlined />} title="Favorites">
      <Menu.Item key="new-fav">
        <StarOutlined />{' '} Add this document
      </Menu.Item>
      <Menu.ItemGroup key="favs">
        <Menu.Item key="fav1">Fav 1</Menu.Item>
        <Menu.Item key="fav2">Fav 2</Menu.Item>
        <Menu.Item key="fav3">Fav 3</Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>,
    <Menu.Item key="search" icon={<FileSearchOutlined />}>
      Search This Document
    </Menu.Item>,
    <SubMenu key="edit" icon={<EditOutlined />} title="Edit">
      <Menu.Item key="new-edit">+ New Edit</Menu.Item>
      <Menu.ItemGroup key="edits" title="Edits">
        <Menu.Item key="edit1">Edit 1</Menu.Item>
        <Menu.Item key="edit2">Edit 2</Menu.Item>
        <Menu.Item key="edit3">Edit 3</Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
  ]
  return SiderTemplate(collapsed, setCollapsed, menuItems);
}

function SearchSider(
  collapsed: boolean,
  setCollapsed: (collapsed: boolean) => void
) {
  const menuItems = [
    <SubMenu
      key="search-groups"
      icon={<GroupOutlined />}
      title="Set Current Group"
    >
      <Menu.Item key="group1">Group 1</Menu.Item>
      <Menu.Item key="group2">Group 2</Menu.Item>
      <Menu.Item key="group3">Group 3</Menu.Item>
    </SubMenu>
  ]
  return SiderTemplate(collapsed, setCollapsed, menuItems);
}

function FileSider(
  collapsed: boolean,
  setCollapsed: (collapsed: boolean) => void
) {
  const menuItems = [
    <Menu.Item icon={<FileAddOutlined />} key="add-file">
      Add File
    </Menu.Item>,
    <Menu.Item icon={<DeleteOutlined />} key="delete-file">
      Delete
    </Menu.Item>,
    <Menu.Item icon={<EditOutlined />} key="rename-file">
      Rename
    </Menu.Item>,
    <SubMenu key="favorites" icon={<StarOutlined />} title="Favorites">
      <Menu.Item key="fav1">Favorite 1</Menu.Item>
      <Menu.Item key="fav2">Favorite 2</Menu.Item>
      <Menu.Item key="fav3">Favorite 3</Menu.Item>
    </SubMenu>,
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
    </SubMenu>,
  ]

  return SiderTemplate(collapsed, setCollapsed, menuItems);
}

export { DocSider, SearchSider, FileSider };
