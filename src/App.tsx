import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import DocUI from './components/DocUI'
import { Layout, Menu, Button } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

import './App.global.css';
import logo from '../assets/icon.svg';

const { Header } = Layout;

const openDocs = [
  { name: 'doc1', uri: '../assets/test1.pdf' },
  { name: 'doc2', uri: '../assets/test2.pdf' },
  { name: 'doc3', uri: '../assets/test3.jpg' },
];

interface IHeadProps {
  docNames: string[],
}

class Head extends React.Component<IHeadProps> {
  state = {
    curDocIdx: null,
  }

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Header
          className="header"
          style={{ background: '#fff1b8', padding: '0' }}
        >
          <Menu
            theme='light'
            mode='horizontal'
            style={{ background: 'none' }}
            selectedKeys={this.state.curDocIdx ? [`${this.state.curDocIdx}`] : []}
            onClick={({ key }) => {
              console.log(key.split('-')[2])
              if (key !== "new-tab") {
                this.setState({ curDocIdx: parseInt(key.split('-')[2])})
              }
            }}
          >
            <img
              src={logo}
              alt="PAIGE Logo"
              height="40px"
              style={{ padding: '0 30px 0 43px', fill: '#002140' }}
            />
            {this.props.docNames.map((name, idx) => {
              return (
                <Menu.Item key={`nav-menu-${idx}`}>
                  <Link to={`/${name}`}>
                    {name}
                  </Link>
                </Menu.Item>
              );
            })}
            <Button
              key="new-tab"
              icon={<PlusSquareOutlined style={{ color: 'white' }} />}
              size="large"
              style={{ margin: '0 20px', background: '#002140' }}
            />
          </Menu>
        </Header>
        {this.props.children}
      </Layout>
    );
  };
};

export default function App() {
  return (
    <HashRouter>
      <Head docNames={openDocs.map((doc) => doc.name)}>
        <Switch>
          <Route exact path='/' render={() => <div>Hello!</div>}/>
          {openDocs.map((docu) => {
            return (
              <Route key={`cr-${docu.name}`} exact path={`/${docu.name}`} render={() => <DocUI doc={docu}/>} />
            )
          })}
        </Switch>
      </Head>
    </HashRouter>
  )
};
