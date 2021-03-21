import React from 'react';
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
import FileSystem from '../utils/FileSystem';

const { DirectoryTree } = Tree;
const { Sider, Content } = Layout;

interface IFileViewer {
  init: Record<string, unknown>[];
}

export default class FileViewer extends React.Component {
  #fileSystem = new FileSystem();

  opts;

  renameInputRef;

  constructor(props: IFileViewer) {
    super(props);
    const { init } = this.props;
    this.fs.loadJson(init);
    this.fs.sortFn = this.alphaSort;
    this.opts = [
      {
        name: 'Copy',
        fn: this.copy,
      },
      {
        name: 'Paste',
        fn: this.paste,
      },
      {
        name: 'Delete',
        fn: this.delete,
      },
      {
        name: 'Duplicate',
        fn: this.duplicate,
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
        fn: this.favorite,
      },
      {
        name: 'test',
        fn: () => {
          message.error('aahhh');
        }
      },
    ];
    this.state = {
      treeData: this.fs.json,
      collapsed: true,
      rename: false,
      selectedKeys: [],
      clipboard: [],
    };
    this.renameInputRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }

  get fs() {
    return this.#fileSystem;
  }

  handleKey = (e) => {
    switch (e.key) {
      case 'Escape':
        this.setState({ collapsed: true });
        break;
      case 'c':
      case 'C':
        if (e.metaKey) {
          const { selectedKeys } = this.state;
          const copies = selectedKeys.map((key) => this.fs.getItem(key).copy);
          this.setState({ clipboard: copies });
        }
        break;
      case 'v':
      case 'V':
        const { clipboard } = this.state;
        const parents = [];
        selectedKeys.forEach((key) => {
          let parent = this.fs.getItem(key);
          if (parent.ext) {
            parent = parent.parent;
          }
          clipboard.forEach((item) => {
            const { copy } = item;
            if (!parent.hasItem(item.name.slice(0, -5))) {
              copy.name = item.name.slice(0, -578);
            } else {
              copy.name = item.name;
            }
            this.fs.insertItem(copy, parent.path);
          });
        });
        this.setState({ treeData: this.fs.json });
      default:
    }
  };

  alphaSort = (list: []) => {
    return list.sort((a, b) => (a.name > b.name ? 1 : -1));
  };

  onDrop = ({ node, dragNodesKeys }) => {
    let parent = this.fs.getItem(node.key);
    if (parent.ext) {
      parent = parent.parent;
    }
    const path = dragNodesKeys[0];
    this.fs.moveItem(path, parent.path);
    this.setState({ treeData: this.fs.json });
  };

  onRightClick = ({ node }) => {
    const { selectedKeys, collapsed } = this.state;
    const sk = selectedKeys.slice();
    if (!sk.includes(node.key) && collapsed) {
      sk.push(node.key);
    }
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

  copy = () => {
    const { selectedKeys } = this.state;
    const copies = selectedKeys.map((key) => this.fs.getItem(key).copy);
    this.setState({ clipboard: copies });
  };

  paste = () => {
    const { clipboard, selectedKeys } = this.state;
    const parents = [];
    selectedKeys.forEach((key) => {
      let parent = this.fs.getItem(key);
      if (parent.ext) {
        parent = parent.parent;
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
    this.setState({ treeData: this.fs.json });
  };

  delete = () => {
    const { selectedKeys } = this.state;
    selectedKeys.forEach((key) => {
      this.fs.removeItem(key);
    });
    this.setState({ treeData: this.fs.json });
  };

  duplicate = () => {
    const { selectedKeys } = this.state;
    selectedKeys.forEach((key) => {
      const { copy, parent } = this.fs.getItem(key);
      parent.insertItem(copy);
    });
    this.setState({ treeData: this.fs.json });
  };

  rename = (newName) => {
    const { selectedKeys } = this.state;
    this.setState({ rename: false });
    try {
      this.fs.renameItem(
        selectedKeys[0],
        this.renameInputRef.current.state.value
      );
      this.setState({ treeData: this.fs.json });
      this.renameInputRef.current.state.value = '';
    } catch (e) {
      message.error(`${e.message}`);
      message.error('hello');
    }
  };

  favorite = () => {
    const { selectedKeys } = this.state;
    selectedKeys.forEach((key) => {
      const item = this.fs.getItem(key);
      item.fav = !item.fav;
      this.setState({ treeData: this.fs.json });
    });
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
            renderItem={(opt) =>
              <List.Item
                style={{ cursor: 'pointer', justifyContent: 'center' }}
                onClick={opt.fn}
              >
                {opt.name}
              </List.Item>
            }
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
            icon={(props) => {
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
            onSelect={(sk) => this.setState({ selectedKeys: sk })}
          />
        </Content>
        <Modal
          title="Rename"
          visible={rename}
          onOk={this.rename}
          onCancel={() => {
            this.setState({ rename: false });
            this.renameInputRef.current.state.value = '';
          }}
        >
          <Input
            ref={this.renameInputRef}
            size="small"
            onPressEnter={this.rename}
          />
        </Modal>
      </Layout>
    );
  }
}
