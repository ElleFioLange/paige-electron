// eslint-disable-next-line import/no-duplicates
import React from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import DocViewer, { DocViewerRenderers, IDocument } from 'react-doc-viewer';
import AuComp from './Autocomplete';

import {
  FolderOpenOutlined,
  HighlightOutlined,
  EditOutlined,
  SearchOutlined,
  FileAddOutlined,
} from '@ant-design/icons';

import '../App.global.css';

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

interface IDocUIProps {
  currentDoc: IDocument
}

class DocUI extends React.Component<IDocUIProps> {

  render() {
    return (
      <Layout>
        <Sider width={250} style={{ background: "#fff8d4", padding: '24px 0 0' }} collapsible >
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
        <Layout style={{ background: '#fffef0' }}>
          <Layout style={{ padding: '24px', background: '#fffef0' }}>
            <AuComp style={{ maxWidth: '700px' }} placeholder="Search this document" />
            <Breadcrumb style={{ margin: '16px 0' }}>
              {this.props.currentDoc.uri.split('/').map((dir: string) => {
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

export default DocUI
