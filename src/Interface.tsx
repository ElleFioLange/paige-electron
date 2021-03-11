// eslint-disable-next-line import/no-duplicates
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button, AutoComplete, Input } from 'antd';
import DocViewer, { DocViewerRenderers, IDocument } from 'react-doc-viewer';

import {
  FolderOpenOutlined,
  HighlightOutlined,
  EditOutlined,
  SearchOutlined,
  FileAddOutlined,
} from '@ant-design/icons';

import './App.global.css';

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

class Interface extends React.Component {

  render() {
    return (
      <Layout>
        <Sider width={250} style={{ background: "#fffbe6", padding: '24px 0 0' }} collapsible >
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
        <Layout style={{ background: '#fffef0' }}>
          <Layout style={{ padding: '24px', background: '#fffef0' }}>
            <AutoComplete
              // options={options}
              // style={{ maxWidth: '700px' }}
              // onSelect={onSelect}
              // onSearch={onSearch}
              // onChange={onChange}
            >
              <Input.Search size="large" placeholder="Search this document" />
            </AutoComplete>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {this.props.currentDoc.uri.split('/').map((dir) => {
                if (dir === '.') {
                  return <Breadcrumb.Item>Home</Breadcrumb.Item>
                } else {
                  return <Breadcrumb.Item>{dir}</Breadcrumb.Item>
                }
              })}
            </Breadcrumb>
            <Content style={{ overflow: 'auto' }}>
              <DocViewer
                documents={[this.props.currentDoc]}
                pluginRenderers={DocViewerRenderers}
                config={{
                  header: {
                    disableHeader: true,
                  },
                }}
              />
              </Content>
            </Layout>
          <Footer style={{ height: '48px', background: "#002140", display: 'flex', alignItems: 'center' }}>
            <Button type='ghost' icon={<HighlightOutlined style={{ color: 'white' }} />} />
          </Footer>
        </Layout>
      </Layout>
    );
  };
};

export default Interface
