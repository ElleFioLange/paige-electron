/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Layout, Breadcrumb, Tabs, Card } from 'antd';
// import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import AutoComp from './components/AutoComp';

import DocView from './components/DocView';

import View from './components/View';
import FileViewer from './components/FileViewer';

import './App.global.css';
import logo from '../assets/icon.svg';

const { Header } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;

const openDocs = [
  {
    name: 'doc1',
    uri: '../dev_root/test1.pdf',
    ftype: 'application/pdf',
    fav: false,
  },
  {
    name: 'doc2',
    uri: '../dev_root/test2.pdf',
    ftype: 'application/pdf',
    fav: true,
  },
  {
    name: 'doc3',
    uri: '../dev_root/test3.jpg',
    ftype: 'image/jpeg',
    fav: false,
  },
];

const testJson = [
  {
    name: 'a',
    fav: false,
    children: [
      { name: 'b', fav: false, ext: 'pdf' },
      { name: 'c', fav: true, ext: 'doc' },
      { name: 'd', fav: true, ext: 'pdf' },
      {
        name: 'e',
        fav: true,
        children: [
          { name: 'f', fav: false, ext: 'pptx' },
          { name: 'g', fav: false, ext: 'txt' },
        ],
      },
    ],
  },
  { name: 'h', fav: true, ext: 'pdf' },
  {
    name: 'i',
    fav: false,
    children: [
      { name: 'j', fav: false, ext: 'pdf' },
      { name: 'k', fav: false, children: [] },
    ],
  },
];

function App() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        className="header"
        style={{
          background: '#fff1b8',
          padding: '0',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          id='test'
          src={logo}
          alt="PAIGE Logo"
          height="40px"
          style={{ padding: '0 25px', cursor: 'pointer' }}
        />
        <AutoComp
          placeholder="Search all documents"
          style={{ width: '60vw' }}
        />
      </Header>
      <Layout>
        <View>
          <DocView />
          {/* <TabPane tab="Search" key="search" style={{ height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Card
                key={'main'}
                style={{
                  margin: '8px',
                  padding: '8px',
                  height: '250px',
                }}
              >
                <Meta title={'main'} description="placeholder" />
              </Card>
              {openDocs.map((doc) => (
                <Card
                  key={doc.name}
                  style={{
                    margin: '8px',
                    padding: '8px',
                    height: '125px',
                  }}
                >
                  <Meta title={doc.name} description="placeholder" />
                </Card>
              ))}
            </div>
          </TabPane>
          <TabPane tab="Files" key="files" style={{ height: '100%' }}>
            <FileViewer init={testJson} />
          </TabPane>
          {openDocs.map((doc, idx) => (
            <TabPane tab={doc.name} key={idx} style={{ height: '100%' }}>
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
          ))} */}
        </View>
      </Layout>
    </Layout>
  );
}

export default App;
