// eslint-disable-next-line import/no-duplicates
import React from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import DocViewer, { DocViewerRenderers, IDocument } from 'react-doc-viewer';
import {
  FolderOpenOutlined,
  HighlightOutlined,
  EditOutlined,
  SearchOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import AuComp from './AuComp';

import '../App.global.css';

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

function DocUI(doc: IDocument) {
  return (
    <Layout>
      <Sider
        width={250}
        style={{ background: '#fff8d4', padding: '24px 0 0' }}
        collapsible
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0, background: '#fff8d4' }}
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
      <Layout>
        <Layout
          style={{
            padding: '24px max(24px, min(48px, 5vw))',
            background: '#fffef0',
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            {doc.uri.split('/').map((dir: string) => {
              if (dir === '.') {
                return <Breadcrumb.Item key="home">Home</Breadcrumb.Item>;
              }
              return <Breadcrumb.Item key={dir}>{dir}</Breadcrumb.Item>;
            })}
          </Breadcrumb>
          <AuComp
            style={{ maxWidth: '700px' }}
            placeholder="Search this document"
          />
          <Content
            style={{
              overflow: 'auto',
              maxHeight: '100%',
              // boxShadow: 'inset -7px -7px 13px #d4d4d4',
              borderRadius: '10px',
              // border: '1px solid red',
            }}
          >
            {/* <KeepAlive style={{ display: 'flex' }}> */}
            <DocViewer
              documents={[doc]}
              pluginRenderers={DocViewerRenderers}
              config={{
                header: {
                  disableHeader: true,
                },
              }}
              style={{
                boxShadow: 'inset -2vw -2vw 3vw #d4d4d4',
                borderRadius: '10px',
              }}
            />
            {/* </KeepAlive> */}
          </Content>
        </Layout>
        <Footer
          style={{
            height: '48px',
            background: '#002140',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            type="ghost"
            icon={<HighlightOutlined style={{ color: 'white' }} />}
          />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default DocUI;
