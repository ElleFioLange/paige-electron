/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Layout, Breadcrumb, Tabs, Card, Tree } from 'antd';
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

const { Header } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;
const { DirectoryTree } = Tree;
const fileSystem = new FileSystem();

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

// const treeData = [
//   {
//     title: 'folder1',
//     key: 2,
//     fav: false,
//     children: [
//       { title: 'file1', key: 3, fav: false, ext: 'pdf' },
//       { title: 'file2', key: 4, fav: true, ext: 'doc' },
//       { title: 'file3', key: 5, fav: true, ext: 'pdf' },
//       {
//         title: 'folder2',
//         key: 6,
//         fav: true,
//         children: [
//           { title: 'file1', key: 7, fav: false, ext: 'pptx' },
//           { title: 'file2', key: 8, fav: false, ext: 'txt' },
//         ],
//       },
//     ],
//   },
//   { title: 'file1', key: 9, fav: true, ext: 'pdf' },
//   {
//     title: 'folder2',
//     key: 10,
//     fav: false,
//     children: [
//       { title: 'file1', key: 11, fav: false, ext: 'pdf' },
//       { title: 'folder3', key: 12, fav: false, children: [] },
//     ],
//   },
// ];

const testJson = [
  {
    name: 'folder1',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'file2', fav: true, ext: 'doc' },
      { name: 'file3', fav: true, ext: 'pdf' },
      {
        name: 'folder2',
        fav: true,
        children: [
          { name: 'file1', fav: false, ext: 'pptx' },
          { name: 'file2', fav: false, ext: 'txt' },
        ],
      },
    ],
  },
  { name: 'file1', fav: true, ext: 'pdf' },
  {
    name: 'folder2',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'folder3', fav: false, children: [] },
    ],
  },
  {
    name: 'foalder1',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'file2', fav: true, ext: 'doc' },
      { name: 'file3', fav: true, ext: 'pdf' },
      {
        name: 'folder2',
        fav: true,
        children: [
          { name: 'file1', fav: false, ext: 'pptx' },
          { name: 'file2', fav: false, ext: 'txt' },
        ],
      },
    ],
  },
  { name: 'filae1', fav: true, ext: 'pdf' },
  {
    name: 'foldaer2',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'folder3', fav: false, children: [] },
    ],
  },
  {
    name: 'foldber1',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'file2', fav: true, ext: 'doc' },
      { name: 'file3', fav: true, ext: 'pdf' },
      {
        name: 'folder2',
        fav: true,
        children: [
          { name: 'file1', fav: false, ext: 'pptx' },
          { name: 'file2', fav: false, ext: 'txt' },
        ],
      },
    ],
  },
  { name: 'fbile1', fav: true, ext: 'pdf' },
  {
    name: 'folbder2',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'folder3', fav: false, children: [] },
    ],
  },
  {
    name: 'folcder1',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'file2', fav: true, ext: 'doc' },
      { name: 'file3', fav: true, ext: 'pdf' },
      {
        name: 'foldecr2',
        fav: true,
        children: [
          { name: 'file1', fav: false, ext: 'pptx' },
          { name: 'file2', fav: false, ext: 'txt' },
        ],
      },
    ],
  },
  { name: 'filec1', fav: true, ext: 'pdf' },
  {
    name: 'folcder2',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'folder3', fav: false, children: [] },
    ],
  },
  {
    name: 'foldder1',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'file2', fav: true, ext: 'doc' },
      { name: 'file3', fav: true, ext: 'pdf' },
      {
        name: 'foldder2',
        fav: true,
        children: [
          { name: 'file1', fav: false, ext: 'pptx' },
          { name: 'file2', fav: false, ext: 'txt' },
        ],
      },
    ],
  },
  { name: 'filde1', fav: true, ext: 'pdf' },
  {
    name: 'foldder2',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'folder3', fav: false, children: [] },
    ],
  },
  {
    name: 'foleder1',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'file2', fav: true, ext: 'doc' },
      { name: 'file3', fav: true, ext: 'pdf' },
      {
        name: 'folder2',
        fav: true,
        children: [
          { name: 'file1', fav: false, ext: 'pptx' },
          { name: 'file2', fav: false, ext: 'txt' },
        ],
      },
    ],
  },
  { name: 'fiele1', fav: true, ext: 'pdf' },
  {
    name: 'foelder2',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'folder3', fav: false, children: [] },
    ],
  },
  {
    name: 'foflder1',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'file2', fav: true, ext: 'doc' },
      { name: 'file3', fav: true, ext: 'pdf' },
      {
        name: 'folder2',
        fav: true,
        children: [
          { name: 'file1', fav: false, ext: 'pptx' },
          { name: 'file2', fav: false, ext: 'txt' },
        ],
      },
    ],
  },
  { name: 'fifle1', fav: true, ext: 'pdf' },
  {
    name: 'foflder2',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'folder3', fav: false, children: [] },
    ],
  },
  {
    name: 'foldger1',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'file2', fav: true, ext: 'doc' },
      { name: 'file3', fav: true, ext: 'pdf' },
      {
        name: 'folder2',
        fav: true,
        children: [
          { name: 'file1', fav: false, ext: 'pptx' },
          { name: 'file2', fav: false, ext: 'txt' },
        ],
      },
    ],
  },
  { name: 'figle1', fav: true, ext: 'pdf' },
  {
    name: 'foglder2',
    fav: false,
    children: [
      { name: 'file1', fav: false, ext: 'pdf' },
      { name: 'folder3', fav: false, children: [] },
    ],
  },
  { name: 'figdfle1', fav: true, ext: 'pdf' },
  { name: 'figlae1', fav: true, ext: 'pdf' },
  { name: 'figles1', fav: true, ext: 'pdf' },
  { name: 'figlvde1', fav: true, ext: 'pdf' },
  { name: 'figleds1', fav: true, ext: 'pdf' },
  { name: 'figdle1', fav: true, ext: 'pdf' },
  { name: 'figlse1', fav: true, ext: 'pdf' },
  { name: 'figlse1', fav: true, ext: 'pdf' },
  { name: 'fiagle1', fav: true, ext: 'pdf' },
  { name: 'figdsle1', fav: true, ext: 'pdf' },
  { name: 'fidgle1', fav: true, ext: 'pdf' },
  { name: 'figlde1', fav: true, ext: 'pdf' },
  { name: 'figldse1', fav: true, ext: 'pdf' },
  { name: 'figsdle1', fav: true, ext: 'pdf' },
  { name: 'figsdale1', fav: true, ext: 'pdf' },
  { name: 'fisgle1', fav: true, ext: 'pdf' },
];

fileSystem.loadJson(testJson);

function onDrop({ node, dragNodesKeys }, fs, setFs) {
  let parent = fs.getItem(node.key);
  if (parent.ext) {
    parent = parent.parent;
  }
  const [parName, parPath] = fs.pathProcess(parent.path);
  dragNodesKeys.forEach((path) => {
    const [itemName, itemPath] = fs.pathProcess(path);
    fs.moveItem(path, `${parPath}/${itemName}`);
  });
  setFs(fs);
}

const fIconSwitch = (ext: string) => {
  switch (ext) {
    case 'pdf':
      return <FilePdfOutlined />;
    case 'jpg':
      return <FileJpgOutlined />;
    default:
      return <FileOutlined />;
  }
};

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [curPane, setCurPane] = useState('files');
  const [fs, setFs] = useState(fileSystem);

  const siderSwitch = (paneName: string) => {
    switch (paneName) {
      case 'search':
        return SearchSider(collapsed, setCollapsed);
      case 'files':
        return FileSider(collapsed, setCollapsed);
      default:
        return DocSider(collapsed, setCollapsed);
    }
  };

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
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {openDocs.map((doc) => (
                  <Card
                    key={doc.name}
                    style={{
                      flexGrow: 1,
                      margin: '8px',
                      padding: '8px',
                      minWidth: '25vw',
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
                treeData={fs.json}
                onDrop={({ node, dragNodesKeys }) =>
                  onDrop({ node, dragNodesKeys }, fs, setFs)
                }
              />
            </TabPane>
            {openDocs.map((doc, idx) => (
              <TabPane
                tab={doc.name}
                key={idx}
                style={{ height: '100%' }}
                forceRender
              >
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
