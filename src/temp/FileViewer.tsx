import React, { Key } from 'react';
import { Layout, Tree, List, message, Input, Modal } from 'antd';
import {
  FileOutlined,
  FilePdfOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FilePptOutlined,
  FileTextOutlined,
  LeftOutlined,
  FileImageTwoTone,
  FilePdfTwoTone,
  FileWordTwoTone,
  FileImageOutlined,
  FilePptTwoTone,
  FileTextTwoTone,
  FileExcelTwoTone,
  FileTwoTone,
} from '@ant-design/icons';
import FileSystem, { ItemData, File, Dir, SortFn } from '../utils/FileSystem';

const { DirectoryTree } = Tree;
const { Sider, Content } = Layout;

interface IFileViewerProps {
  fs: FileSystem;
  sortFn: SortFn;
}

interface IFileViewerState {
  treeData: ItemData[];
  collapsed: boolean;
  rename: boolean;
  selectedKeys: string[];
  clipboard: (File | Dir)[];
}

export default class FileViewer extends React.Component<
  IFileViewerProps,
  IFileViewerState
> {
  opts = [
    {
      name: 'Copy',
      fn: () => {
        const { selectedKeys } = this.state;
        this.setState({
          clipboard: selectedKeys.map((key) => this.fs.getItem(key).copy),
        });
      },
    },
    {
      name: 'Paste',
      fn: () => {
        const { clipboard, selectedKeys } = this.state;
        selectedKeys.forEach((key) => {
          const temp = this.fs.getItem(key);
          let parent: Dir;
          if (temp instanceof Dir) {
            parent = temp;
          } else if (temp.parent) {
            parent = temp.parent;
          }
          clipboard.forEach((item) => {
            const { copy } = item;
            if (!parent.hasItem(item.name.slice(0, -5))) {
              copy.name = item.name.slice(0, -5);
            } else {
              copy.name = item.name;
            }
            this.fs.insertItem(copy, parent.path);
          });
        });
        this.setState({ treeData: this.fs.data });
      },
    },
    {
      name: 'Delete',
      fn: () => {
        const { selectedKeys } = this.state;
        selectedKeys.forEach((key) => {
          this.fs.removeItem(key);
        });
        this.setState({ treeData: this.fs.data });
      },
    },
    {
      name: 'Duplicate',
      fn: () => {
        const { selectedKeys } = this.state;
        selectedKeys.forEach((key) => {
          const { copy, parent } = this.fs.getItem(key);
          if (parent) parent.insertItem(copy);
        });
        this.setState({ treeData: this.fs.data });
      },
    },
    {
      name: 'Rename',
      fn: () => {
        const { selectedKeys } = this.state;
        if (selectedKeys.length > 1) {
          message.error("Can't rename multiple items at once", 1.5);
        } else {
          this.setState({ rename: true });
        }
      },
    },
    {
      name: 'Favorite',
      fn: () => {
        const { selectedKeys } = this.state;
        selectedKeys.forEach((key) => {
          const item = this.fs.getItem(key);
          item.fav = !item.fav;
          this.setState({ treeData: this.fs.data });
        });
      },
    },
  ];

  renameInputRef = React.createRef<Input>();

  constructor(props: IFileViewerProps) {
    super(props);
    this.state = {
      treeData: this.fs.data,
      collapsed: true,
      rename: false,
      selectedKeys: [],
      clipboard: [],
    };
  }

  get fs() {
    const { fs } = this.props;
    return fs;
  }

  onDrop = (data: { node: { key: string | number }; dragNodesKeys: Key[] }) => {
    const { node, dragNodesKeys } = data;
    const key = `${node.key}`;
    let parent;
    parent = this.fs.getItem(key);
    if (parent instanceof File) {
      parent = parent.parent;
    }
    const path = `${dragNodesKeys[0]}`;
    if (parent instanceof Dir) this.fs.moveItem(path, parent.path);
    this.setState({ treeData: this.fs.data });
  };

  onRightClick = (data: { node: { key: string | number } }) => {
    const { node } = data;
    const key = `${node.key}`;
    const { selectedKeys, collapsed } = this.state;
    const sk = selectedKeys.slice();
    if (!sk.includes(key) && collapsed) sk.push(key);
    this.setState({
      collapsed: false,
      selectedKeys: sk,
    });
  };

  fIconSwitch = (ext: string, fav: boolean) => {
    switch (ext) {
      case 'pdf':
        return fav ? <FilePdfTwoTone /> : <FilePdfOutlined />;
      case 'jpg':
        return fav ? <FileImageTwoTone /> : <FileImageOutlined />;
      case 'doc':
      case 'docx':
        return fav ? <FileWordTwoTone /> : <FileWordOutlined />;
      case 'ppt':
      case 'pptx':
      case 'pptm':
        return fav ? <FilePptTwoTone /> : <FilePptOutlined />;
      case 'txt':
      case 'rtf':
        return fav ? <FileTextTwoTone /> : <FileTextOutlined />;
      case 'xlsx':
      case 'xlsm':
      case 'xlsb':
      case 'xlst':
      case 'xls':
      case 'xlt':
      case 'xltm':
      case 'xltx':
      case 'xlw':
        return fav ? <FileExcelTwoTone /> : <FileExcelOutlined />;
      default:
        return fav ? <FileTwoTone /> : <FileOutlined />;
    }
  };

  renameCB = () => {
    const { selectedKeys } = this.state;
    this.setState({ rename: false });
    if (this.renameInputRef.current) {
      try {
        this.fs.renameItem(
          selectedKeys[0],
          this.renameInputRef.current.state.value
        );
        this.setState({ treeData: this.fs.data });
        this.renameInputRef.current.setState({ value: '' });
      } catch (e) {
        message.error(`${e.message}`);
      }
    }
  };

  render() {
    const { treeData, collapsed, selectedKeys, rename } = this.state;
    return (
      <Layout
        style={{
          background: '#fffef0',
          border: '1px solid #d9d8cc',
        }}
      >
        <Sider
          width={100}
          style={{ background: '#fff8d4' }}
          collapsible
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
        >
          <List
            size="small"
            dataSource={this.opts}
            renderItem={(opt) => (
              <List.Item
                style={{ cursor: 'pointer', justifyContent: 'center' }}
                onClick={opt.fn}
              >
                {opt.name}
              </List.Item>
            )}
          >
            <List.Item
              style={{ cursor: 'pointer', justifyContent: 'center' }}
              onClick={() =>
                this.setState({
                  collapsed: true,
                  selectedKeys: [],
                  rename: false,
                })
              }
            >
              <LeftOutlined />
            </List.Item>
          </List>
        </Sider>
        <Content>
          <DirectoryTree
            icon={(props: { data: ItemData; expanded: boolean }) => {
              if (props.data.ext) {
                return this.fIconSwitch(props.data.ext, props.data.fav);
              }
              return props.expanded ? (
                <FolderOpenOutlined />
              ) : (
                <FolderOutlined />
              );
            }}
            style={{
              background: '#fffef0',
              padding: '8px',
            }}
            draggable={(node) => {
              if (node.key === 'Home') {
                return false;
              }
              return true;
            }}
            expandAction="doubleClick"
            multiple
            selectedKeys={selectedKeys}
            treeData={treeData}
            onDrop={this.onDrop}
            defaultExpandAll
            onRightClick={this.onRightClick}
            onSelect={(sk) =>
              this.setState({ selectedKeys: sk.map((key) => `${key}`) })
            }
          />
        </Content>
        <Modal
          title="Rename"
          visible={rename}
          onOk={this.renameCB}
          onCancel={() => {
            this.setState({ rename: false });
            if (this.renameInputRef.current)
              this.renameInputRef.current.setState({ value: '' });
          }}
        >
          <Input
            ref={this.renameInputRef}
            size="small"
            onPressEnter={this.renameCB}
          />
        </Modal>
      </Layout>
    );
  }
}
