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
import AutoComp from './AutoComp';

import '../App.global.css';

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

function DocUI(doc: IDocument) {
  return (
    <Layout>
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
          <AutoComp
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
