import React from 'react';
import { Layout, Menu } from 'antd';
import Icon, {
  FileSearchOutlined,
  FileAddOutlined,
  StarOutlined,
  GroupOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SortSVG = () => (
  <svg
    viewBox="0 0 36 36"
    focusable="false"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <rect x="9.8" y="22.9" width="16.4" height="3.3"/>
    <rect x="9.8" y="16.4" width="16.4" height="3.3"/>
    <polygon points="26.2,29.5 26.2,32.7 10.6,32.7 13.1,29.5 "/>
    <polygon points="9.8,6.5 9.8,3.3 25.4,3.3 22.9,6.5 "/>
    <rect x="9.8" y="9.8" width="16.4" height="3.3"/>
    <path d="M6.5,29.5H3.3V6.5h3.3V29.5z M4.9,36l4.9-6.5H0L4.9,36z"/>
    <path d="M29.5,6.5h3.3v22.9h-3.3V6.5z M31.1,0l-4.9,6.5H36L31.1,0z"/>
  </svg>
);

const SortIcon = (props) => <Icon component={SortSVG} {...props} />;

interface ISiderTemplate {
  menuItems: Jsx.Element[];
}

class SiderTemplate extends React.Component<ISiderTemplate> {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  render() {
    const { collapsed } = this.state;
    const { menuItems } = this.props;
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
            <Menu.Item key="fav1">Fav 1</Menu.Item>
            <Menu.Item key="fav2">Fav 2</Menu.Item>
            <Menu.Item key="fav3">Fav 3</Menu.Item>
          </SubMenu>
          <SubMenu
            key="search-groups"
            icon={<GroupOutlined />}
            title="Set Current Group"
          >
            <Menu.Item key="group1">Group 1</Menu.Item>
            <Menu.Item key="group2">Group 2</Menu.Item>
            <Menu.Item key="group3">Group 3</Menu.Item>
          </SubMenu>
          {menuItems}
        </Menu>
      </Sider>
    );
  }
}

function SearchSider() {
  return <SiderTemplate menuItems={[]} />;
}

function FileSider() {
  const menuItems = [
    <Menu.Item icon={<FileAddOutlined />} key="add-file">
      Add File
    </Menu.Item>,
    <SubMenu key="sorts" icon={<SortIcon />} title="Sort">
      <Menu.Item key="alp-sort" icon={<SortDescendingOutlined />}>
        Alphabetical
      </Menu.Item>
      <Menu.Item key="alp-sort-reverse" icon={<SortAscendingOutlined />}>
        Alphabetical reversed
      </Menu.Item>
      <Menu.Item key="date-sort" icon={<CalendarOutlined />}>
        Newest
      </Menu.Item>
      <Menu.Item key="date-sort-reversed" icon={<CalendarOutlined />}>
        Oldest
      </Menu.Item>
    </SubMenu>,
  ];

  return <SiderTemplate menuItems={menuItems} />;
}

function DocSider() {
  const menuItems = [
    <Menu.Item key="search" icon={<FileSearchOutlined />}>
      Search This Document
    </Menu.Item>,
  ];
  return <SiderTemplate menuItems={menuItems} />;
}

export default function SiderSwitch(key: string) {
  switch (key) {
    case 'search':
      return SearchSider();
    case 'files':
      return FileSider();
    default:
      return DocSider();
  }
}
