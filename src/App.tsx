import React from 'react';
import { Layout, Menu, Breadcrumb, Tabs } from 'antd';
// import AutoComp from './components/AutoComp';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { SearchOutlined, EditOutlined, FolderOpenOutlined, FileAddOutlined } from '@ant-design/icons';

import './App.global.css';
import logo from '../assets/icon.svg';

const { Header, Sider } = Layout;
const { TabPane } = Tabs;
const { SubMenu } = Menu;

const openDocs = [
  { name: 'doc1', uri: '../assets/test1.pdf' },
  { name: 'doc2', uri: '../assets/test2.pdf' },
  { name: 'doc3', uri: '../assets/test3.jpg' },
];

function App() {

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        className="header"
        style={{ background: '#fff1b8', padding: '0', display: 'flex', alignItems: 'center' }}
      >
        <img
          src={logo}
          alt="PAIGE Logo"
          height="40px"
          style={{ padding: '0 30px 0 43px', fill: '#002140' }}
        />
      </Header>
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
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Tabs tabBarStyle={{ height: "49px", backgroundColor: "#002140", padding: '0 60px', margin: '0' }} tabPosition='bottom' style={{ position: 'absolute', width: '100%', height: '100%' }} >
            {openDocs.map((doc, idx) => {
              return (
                <TabPane tab={doc.name} key={idx} style={{ height: '100%' }}>
                  <Breadcrumb style={{ marginBottom: '16px' }}>
                    {doc.uri.split('/').map((dir: string) => {
                      if (dir === '.') {
                        return <Breadcrumb.Item key="home">Home</Breadcrumb.Item>;
                      }
                      return <Breadcrumb.Item key={dir}>{dir}</Breadcrumb.Item>;
                    })}
                  </Breadcrumb>
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
                </TabPane>
              );
            })}
          </Tabs>
        </div>
      </Layout>
    </Layout>
  );
};

export default App;
