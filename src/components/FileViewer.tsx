import React from 'react';
import { Tree } from 'antd';
import {
  FileJpgOutlined,
  FileOutlined,
  FilePdfOutlined,
  FolderOpenOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import FileSystem from '../utils/FileSystem';

const { DirectoryTree } = Tree;

interface IFileViewer {
  init: Record<string, unknown>[];
}

export default class FileViewer extends React.Component<IFileViewer> {
  #fileSystem = new FileSystem();

  constructor(props) {
    super(props);
    const { init } = this.props;
    this.fs.loadJson(init);
    this.fs.sortFn = this.alphaSort;
    this.state = {
      treeData: this.fs.json,
    };
  }

  get fs() {
    return this.#fileSystem;
  }

  alphaSort = (list: []) => {
    return list.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  onDrop = ({ node, dragNodesKeys }) => {
    let parent = this.fs.getItem(node.key);
    if (parent.ext) {
      parent = parent.parent;
    }
    const path = dragNodesKeys[0];
    this.fs.moveItem(path, parent.path);
    this.setState({ treeData: this.fs.json });
  };

  fIconSwitch = (ext: string) => {
    switch (ext) {
      case 'pdf':
        return <FilePdfOutlined />;
      case 'jpg':
        return <FileJpgOutlined />;
      default:
        return <FileOutlined />;
    }
  };

  render() {
    const { treeData } = this.state;
    return (
      <DirectoryTree
        icon={(props) => {
          if (props.data.ext) {
            return this.fIconSwitch(props.data.ext);
          }
          return props.expanded ? <FolderOpenOutlined /> : <FolderOutlined />;
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
        onDrop={this.onDrop}
        defaultExpandAll
      />
    );
  }
}
