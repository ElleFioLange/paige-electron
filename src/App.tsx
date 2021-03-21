import React from 'react';
import { Layout, Breadcrumb, Tabs, Card, AutoComplete, Input } from 'antd';

import FileSystem, { ItemInit, Item } from './utils/FileSystem';

import SiderSwitch from './temp/Siders';

import StaticDocViewer from './temp/StaticDocViewer';
import FileViewer from './temp/FileViewer';

import './App.global.css';
import logo from '../assets/icon.svg';

const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;

const test = [
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

type Doc = {
  name: string;
  uri: string;
};

interface IAppProps {
  username: string;
  data: ItemInit[];
}

interface IAppState {
  openDocs: Doc[];
  acOptions: { value: string }[];
  activeTab: string;
  sortFn: (list: Item[]) => Item[];
}

class App extends React.Component<IAppProps, IAppState> {
  fs = new FileSystem();

  constructor(props: IAppProps) {
    super(props);
    const { data } = this.props;
    this.fs.load(data);
    this.state = {
      openDocs: test,
      acOptions: [],
      activeTab: 'search',
      sortFn: this.alphaSort,
    };
  }

  onSearch(searchText: string) {
    const acOptions = !searchText
      ? []
      : [
          { value: searchText },
          { value: searchText.repeat(2) },
          { value: searchText.repeat(3) },
        ];
    this.setState({ acOptions });
  }

  alphaSort = (list: Item[]) => {
    return list.sort((a, b) => (a.name > b.name ? 1 : -1));
  };

  render() {
    const { openDocs, acOptions, activeTab, sortFn } = this.state;
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
          />
          <AutoComplete
            options={acOptions}
            style={{ width: '60vw' }}
            onSearch={(a) => {
              this.onSearch(a);
            }}
          >
            <Input.Search size="large" placeholder="Search" />
          </AutoComplete>
        </Header>
        <Layout>
          {SiderSwitch(activeTab)}
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Tabs
              activeKey={activeTab}
              onChange={(key) => this.setState({ activeTab: key })}
              tabBarStyle={{
                height: '49px',
                backgroundColor: '#0c304d',
                padding: '0 24px',
                margin: '0',
              }}
              tabPosition="bottom"
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              <TabPane tab="Search" key="search" style={{ height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Card
                    key="main"
                    style={{
                      margin: '8px',
                      padding: '8px',
                      height: '250px',
                    }}
                  >
                    <Meta title="main" description="placeholder" />
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
                <FileViewer fs={this.fs} sortFn={sortFn} />
              </TabPane>
              {openDocs.map((doc) => {
                return (
                  <TabPane
                    tab={doc.name}
                    key={doc.name}
                    style={{ height: '100%' }}
                  >
                    <Breadcrumb
                      style={{ marginBottom: '16px', marginTop: '-8px' }}
                    >
                      {doc.uri.split('/').map((dir: string) => {
                        if (dir === '.') {
                          return (
                            <Breadcrumb.Item key="home">Home</Breadcrumb.Item>
                          );
                        }
                        return (
                          <Breadcrumb.Item key={dir}>{dir}</Breadcrumb.Item>
                        );
                      })}
                    </Breadcrumb>
                    <StaticDocViewer doc={doc} />
                  </TabPane>
                );
              })}
            </Tabs>
          </div>
        </Layout>
      </Layout>
    );
  }
}

export default App;
