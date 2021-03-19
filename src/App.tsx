/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Layout, Breadcrumb, Tabs, Card, Tree, Menu } from 'antd';
import {
  FileJpgOutlined,
  FileOutlined,
  FilePdfOutlined,
  FolderOpenOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import AutoComp from './components/AutoComp';
import { DocSider, SearchSider, FileSider } from './components/Siders';
import FileSystem from './utils/Filesystem';

import './App.global.css';
import logo from '../assets/icon.svg';

const { Header, Sider } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;
const { DirectoryTree } = Tree;
const { SubMenu } = Menu;

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

function alphaSort(list) {
  return list.sort((a, b) => (a.name > b.name ? 1 : -1));
}

const fs = new FileSystem();
fs.loadJson(testJson);

fs.sortFn = alphaSort;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [curPane, setCurPane] = useState('0');
  const [treeData, setTreeData] = useState(fs.json);

  function onDrop({ node, dragNodesKeys }) {
    let parent = fs.getItem(node.key);
    if (parent.ext) {
      parent = parent.parent;
    }
    const path = dragNodesKeys[0];
    fs.moveItem(path, parent.path);
    setTreeData(fs.json);
  }

  function siderSwitch(paneName: string) {
    switch (paneName) {
      case 'search':
        return SearchSider(collapsed, setCollapsed);
      case 'files':
        return FileSider(collapsed, setCollapsed);
      default:
        return DocSider(collapsed, setCollapsed);
    }
  }

  function fIconSwitch(ext: string) {
    switch (ext) {
      case 'pdf':
        return <FilePdfOutlined />;
      case 'jpg':
        return <FileJpgOutlined />;
      default:
        return <FileOutlined />;
    }
  }

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
          src={logo}
          alt="PAIGE Logo"
          height="40px"
          style={{ padding: '0 25px', cursor: 'pointer' }}
          onClick={() => setCurPane('search')}
        />
        <AutoComp
          placeholder="Search all documents"
          style={{ width: '60vw' }}
        />
      </Header>
      <Layout>
        {siderSwitch(curPane)}
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Tabs
            activeKey={curPane}
            onChange={(key) => setCurPane(key)}
            tabBarStyle={{
              height: '49px',
              backgroundColor: '#0c304d',
              padding: '0 24px',
              margin: '0',
            }}
            tabPosition="bottom"
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <TabPane
              tab="Search"
              key="search"
              style={{ height: '100%' }}
              forceRender
            >
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
            <TabPane
              tab="Files"
              key="files"
              style={{ height: '100%' }}
              forceRender
            >
              <DirectoryTree
                icon={(props) => {
                  if (props.data.ext) {
                    return fIconSwitch(props.data.ext);
                  }
                  return props.expanded ? (
                    <FolderOpenOutlined />
                  ) : (
                    <FolderOutlined />
                  );
                }}
                style={{
                  background: '#fffef0',
                  border: '1px solid #d9d8cc',
                  padding: '8px',
                }}
                draggable
                expandAction="doubleClick"
                multiple
                treeData={treeData}
                onDrop={onDrop}
                defaultExpandAll
              />
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
            ))}
          </Tabs>
        </div>
      </Layout>
    </Layout>
  );
}

export default App;

