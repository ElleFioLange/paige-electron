/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  FileSearchOutlined,
  FileAddOutlined,
  StarOutlined,
  GroupOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import {
  SortIcon,
  SortCalUpIcon,
  SortCalDownIcon,
} from '../../assets/CustomIcons';
import { Item } from '../utils/FileSystem';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface ISiderTemplateProps {
  favs: Item[];
  groups: string[];
}

interface ISiderTemplateState {
  collapsed: boolean;
}

class SiderTemplate extends React.Component<
  ISiderTemplateProps,
  ISiderTemplateState
> {
  constructor(props: ISiderTemplateProps) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  render() {
    const { collapsed } = this.state;
    const { children, favs, groups } = this.props;
    return (
      <Sider
        width={250}
        style={{ background: '#fff8d4', padding: '20px 0 0' }}
        collapsible
        collapsed={collapsed}
        onCollapse={() => this.setState({ collapsed: !collapsed })}
      >
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0, background: '#fff8d4' }}
        >
          <SubMenu key="favs" icon={<StarOutlined />} title="Favorites">
            {favs.map((item) => (
              <Menu.Item key={item.path}>{item.name}</Menu.Item>
            ))}
          </SubMenu>
          <SubMenu
            key="search-groups"
            icon={<GroupOutlined />}
            title="Set Current Group"
          >
            {groups.map((group) => (
              <Menu.Item key={group}>{group}</Menu.Item>
            ))}
          </SubMenu>
          {children}
        </Menu>
      </Sider>
    );
  }
}

function SearchSider(props: ISiderTemplateProps) {
  return <SiderTemplate {...props} />;
}

function FileSider(props: ISiderTemplateProps) {
  return (
    <SiderTemplate {...props}>
      <Menu.Item icon={<FileAddOutlined />} key="add-file">
        Add File
      </Menu.Item>
      <SubMenu key="sorts" icon={<SortIcon />} title="Sort">
        <Menu.Item key="alp-sort" icon={<SortAscendingOutlined />}>
          Alphabetical
        </Menu.Item>
        <Menu.Item key="alp-sort-reverse" icon={<SortDescendingOutlined />}>
          Alphabetical reversed
        </Menu.Item>
        <Menu.Item key="date-sort" icon={<SortCalUpIcon />}>
          Newest
        </Menu.Item>
        <Menu.Item key="date-sort-reversed" icon={<SortCalDownIcon />}>
          Oldest
        </Menu.Item>
      </SubMenu>
    </SiderTemplate>
  );
}

function DocSider(props: ISiderTemplateProps) {
  return (
    <SiderTemplate {...props}>
      <Menu.Item key="search" icon={<FileSearchOutlined />}>
        Search This Document
      </Menu.Item>
    </SiderTemplate>
  );
}

export default function SiderSwitch(key: string, props: ISiderTemplateProps) {
  switch (key) {
    case 'search':
      return SearchSider(props);
    case 'files':
      return FileSider(props);
    default:
      return DocSider(props);
  }
}
