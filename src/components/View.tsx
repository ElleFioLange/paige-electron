import React from 'react';
import { Tabs, Card, Breadcrumb } from 'antd';
import SiderSwitch from './Siders';
import FileViewer from './FileViewer';

const { TabPane } = Tabs;
const { Meta } = Card;

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

export default class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: 'search',
      openDocs: [
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
      ],
    };
  }

  render() {
    const { activeKey, openDocs } = this.state;
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, (child, idx) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { openDocs, idx });
      }
      return child;
    });
    return (
      <>
        {SiderSwitch(activeKey)}
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Tabs
            activeKey={activeKey}
            onChange={(key) => this.setState({ activeKey: key })}
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
                {childrenWithProps}
                {/* <DocViewer
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
                /> */}
              </TabPane>
            ))}
          </Tabs>
        </div>
      </>
    );
  }
}
