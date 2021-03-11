// eslint-disable-next-line import/no-duplicates
import React from 'react';
import Interface from './Interface'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

import './App.global.css';

import logo from './icon.svg';

const { Header } = Layout;

const openDocs = [
  { name: 'Doc 1', uri: './test1.pdf' },
  { name: 'Doc 2', uri: './test2.pdf' },
];

class Main extends React.Component {state={ docIdx: 0 }

  handleClick(idx) {
    this.setState({ docIdx: idx })
  }

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Header
          className="header"
          style={{ background: '#fff1b8', padding: '0' }}
        >
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ background: 'none' }}
            onClick={(item) => this.handleClick(item.key)}
          >
            <img
              src={logo}
              alt="PAIGE Logo"
              height="40px"
              style={{ padding: '0 30px 0 43px', fill: '#002140' }}
            />
            {openDocs.map((doc, idx) => {
              return <Menu.Item key={idx}>{doc.name}</Menu.Item>;
            })}
            <Button
              icon={<PlusSquareOutlined style={{ color: 'white' }} />}
              size="large"
              style={{ margin: '0 20px', background: '#002140' }}
            />
          </Menu>
        </Header>
        <Interface currentDoc={openDocs[this.state.docIdx]}/>
      </Layout>

    );
  };
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
