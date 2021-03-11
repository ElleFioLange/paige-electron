// eslint-disable-next-line import/no-duplicates
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button, AutoComplete, Input } from 'antd';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

import {
  FolderOpenOutlined,
  NotificationOutlined,
  PlusSquareOutlined,
  EditOutlined,
  SearchOutlined,
  FileAddOutlined,
} from '@ant-design/icons';

import logo from './icon.svg';

import './App.global.css';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

const openDocs = [
  { name: 'Doc 1', uri: './test1.pdf' },
  { name: 'Doc 2', uri: './test2.pdf' },
];

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const Interface = () => {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const onSearch = (searchText: string) => {
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };
  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };
  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        className="header"
        style={{ background: '#fff1b8', padding: '0' }}
      >
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ background: 'none' }}
        >
          <img
            src={logo}
            alt="PAIGE Logo"
            height="40px"
            style={{ padding: '0 30px 0 50px', fill: '#002140' }}
          />
          {openDocs.map((doc) => {
            return <Menu.Item key={doc.name}>{doc.name}</Menu.Item>;
          })}
          <Button
            icon={<PlusSquareOutlined />}
            size="large"
            style={{ margin: '0 20px', background: '#ffe58f' }}
          />
        </Menu>
      </Header>
      <Layout>
        <Sider width={250} className="site-layout-background" collapsible>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0, background: '#fffbe6' }}
          >
            <SubMenu key="search" icon={<SearchOutlined />} title="Search">
              <Menu.Item key="search-all">Search All Documents</Menu.Item>
              <Menu.Item key="new-group">+ New Group</Menu.Item>
            </SubMenu>
            <SubMenu key="edit" icon={<EditOutlined />} title="Edit">
              <Menu.Item key="new-edit">+ New Edit</Menu.Item>
              <Menu.ItemGroup key="edits" title="Edits">
                <Menu.Item key="edit1">Edit 1</Menu.Item>
                <Menu.Item key="edit2">Edit 2</Menu.Item>
                <Menu.Item key="edit3">Edit 3</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="open" icon={<FolderOpenOutlined />}>
              Show file
            </Menu.Item>
            <Menu.Item key="upload" icon={<FileAddOutlined />}>
              Add file
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px 0 0', background: '#fffef0' }}>
          <div style={{ padding: '0 24px'}}>
            <AutoComplete
              options={options}
              style={{ maxWidth: '700px' }}
              onSelect={onSelect}
              onSearch={onSearch}
              onChange={onChange}
            >
              <Input.Search size="large" placeholder="Search this document" />
            </AutoComplete>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content className="paige-canvas">
              <DocViewer
                documents={openDocs.slice(1)}
                pluginRenderers={DocViewerRenderers}
                config={{
                  header: {
                    disableHeader: true,
                  },
                }}
              />
            </Content>
          </div>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Interface
