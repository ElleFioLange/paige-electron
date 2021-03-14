import React, { useState, useRef } from 'react';
import { Layout, Menu, Breadcrumb, Tabs, Card } from 'antd';
import AutoComp from './components/AutoComp';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { SearchOutlined, EditOutlined, FolderOpenOutlined, FileAddOutlined } from '@ant-design/icons';
import { DocSider, SearchSider } from './components/Siders';

import './App.global.css';
import logo from '../assets/icon.svg';

const { Header, Sider } = Layout;
const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { Meta } = Card;

function App() {

  const openDocs = [
    { name: 'doc1', uri: '../assets/test1.pdf' },
    { name: 'doc2', uri: '../assets/test2.pdf' },
    { name: 'doc3', uri: '../assets/test3.jpg' },
  ];

  const [collapsed, setCollapsed] = useState(true)
  const [curPane, setCurPane] = useState('search')

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
          style={{ padding: '0 25px' }}
        />
        <AutoComp placeholder='Search all documents' style={{ width: '60vw' }} />
      </Header>
      <Layout>
        {curPane === 'search' ? SearchSider(collapsed, setCollapsed) : (curPane != 'files' ? DocSider(collapsed, setCollapsed) : null)}
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Tabs onChange={(key) => setCurPane(key)} tabBarStyle={{ height: "49px", backgroundColor: "#0c304d", padding: '0 24px', margin: '0' }} tabPosition='bottom' style={{ position: 'absolute', width: '100%', height: '100%' }} >
            <TabPane tab='Search' key='search' style={{ height: '100%' }} forceRender>
              <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                {openDocs.map((doc) =>
                  <Card style={{ flexGrow: 1, margin: '8px', padding: '8px', minWidth: '25vw', }}>
                    <Meta title={doc.name} description='placeholder' />
                  </Card>
                )}
              </div>
            </TabPane>
            <TabPane tab='Files' key='files' style={{ height: '100%' }} forceRender>
              <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                {openDocs.map((doc) =>
                  <Card style={{ flexGrow: 1, margin: '8px', padding: '8px', minWidth: '25vw', }}>
                    <Meta title={doc.name} description='placeholder' />
                  </Card>
                )}
              </div>
            </TabPane>
            {openDocs.map((doc, idx) =>
                <TabPane tab={doc.name} key={idx} style={{ height: '100%' }} forceRender>
                  <Breadcrumb style={{ marginBottom: '16px', marginTop: '-8px' }}>
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
            )}
          </Tabs>
        </div>
      </Layout>
    </Layout>
  );
};

export default App;
