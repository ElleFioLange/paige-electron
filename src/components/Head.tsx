import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import '../App.global.css';
import logo from '../../assets/icon.svg';

const { Header } = Layout;

interface IHeadProps {
  docNames: string[],
  curDocIdx?: number,
}

class Head extends React.Component<IHeadProps> {

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
            selectedKeys={this.props.curDocIdx ? [`${this.props.curDocIdx}`] : []}
          >
            <img
              src={logo}
              alt="PAIGE Logo"
              height="40px"
              style={{ padding: '0 30px 0 43px', fill: '#002140' }}
            />
            <Link to='/'>Home</Link>
            {this.props.docNames.map((name, idx) => {
              return (
                <Menu.Item key={idx}>
                  <Link to={`/${name}`}>
                    {name}
                  </Link>
                </Menu.Item>
              );
            })}
            <Button
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

export default Head;
