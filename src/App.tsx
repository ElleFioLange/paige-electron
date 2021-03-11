// eslint-disable-next-line import/no-duplicates
import React from 'react';
import Interface from './Interface'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.global.css';

class Main extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      doc: {
        name: 'Doc 1',
        uri: './test1.pdf',
      },
    };
  };

  render() {
    return (
      <Interface />
    );
  };
  // const [options, setOptions] = useState<{ value: string }[]>([]);
  // const onSearch = (searchText: string) => {
  //   setOptions(
  //     !searchText
  //       ? []
  //       : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
  //   );
  // };
  // const onSelect = (data: string) => {
  //   console.log('onSelect', data);
  // };
  // const onChange = (data: string) => {
  //   setValue(data);
  // };

  // render() {
  //   return (
  //     <Layout style={{ height: '100vh' }}>
  //       <Header
  //         className="header"
  //         style={{ background: '#fff1b8', padding: '0' }}
  //       >
  //         <Menu
  //           theme="light"
  //           mode="horizontal"
  //           defaultSelectedKeys={['2']}
  //           style={{ background: 'none' }}
  //         >
  //           <img
  //             src={logo}
  //             alt="PAIGE Logo"
  //             height="40px"
  //             style={{ padding: '0 30px 0 50px', fill: '#002140' }}
  //           />
  //           {openDocs.map((doc) => {
  //             return <Menu.Item key={doc.name}>{doc.name}</Menu.Item>;
  //           })}
  //           <Button
  //             icon={<PlusSquareOutlined />}
  //             size="large"
  //             style={{ margin: '0 20px', background: '#ffe58f' }}
  //           />
  //         </Menu>
  //       </Header>
  //       <Layout>
  //         <Sider width={250} className="site-layout-background" collapsible>
  //           <Menu
  //             mode="inline"
  //             defaultSelectedKeys={['1']}
  //             defaultOpenKeys={['sub1']}
  //             style={{ height: '100%', borderRight: 0, background: '#fffbe6' }}
  //           >
  //             <SubMenu key="search" icon={<SearchOutlined />} title="Search">
  //               <Menu.Item key="search-all">Search All Documents</Menu.Item>
  //               <Menu.Item key="new-group">+ New Group</Menu.Item>
  //             </SubMenu>
  //             <SubMenu key="edit" icon={<EditOutlined />} title="Edit">
  //               <Menu.Item key="new-edit">+ New Edit</Menu.Item>
  //               <Menu.ItemGroup key="edits" title="Edits">
  //                 <Menu.Item key="edit1">Edit 1</Menu.Item>
  //                 <Menu.Item key="edit2">Edit 2</Menu.Item>
  //                 <Menu.Item key="edit3">Edit 3</Menu.Item>
  //               </Menu.ItemGroup>
  //             </SubMenu>
  //             <Menu.Item key="open" icon={<FolderOpenOutlined />}>
  //               Show file
  //             </Menu.Item>
  //             <Menu.Item key="upload" icon={<FileAddOutlined />}>
  //               Add file
  //             </Menu.Item>
  //           </Menu>
  //         </Sider>
  //         <Layout style={{ padding: '0 24px 24px', background: '#fffef0' }}>
  //           <AutoComplete
  //             options={options}
  //             style={{ padding: '20px 0 0 0', maxWidth: '700px' }}
  //             onSelect={onSelect}
  //             onSearch={onSearch}
  //             onChange={onChange}
  //           >
  //             <Input.Search size="large" placeholder="Search this document" />
  //           </AutoComplete>
  //           <Breadcrumb style={{ margin: '16px 0' }}>
  //             <Breadcrumb.Item>Home</Breadcrumb.Item>
  //             <Breadcrumb.Item>List</Breadcrumb.Item>
  //             <Breadcrumb.Item>App</Breadcrumb.Item>
  //           </Breadcrumb>
  //           <Content className="paige-canvas">
  //             <DocViewer
  //               documents={openDocs.slice(1)}
  //               pluginRenderers={DocViewerRenderers}
  //               config={{
  //                 header: {
  //                   disableHeader: true,
  //                 },
  //               }}
  //             />
  //           </Content>
  //         </Layout>
  //       </Layout>
  //     </Layout>
  //   );
  // }
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}
