import React from 'react';
import DocUI from './components/DocUI'
import { HashRouter, Link } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import { useLocation } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import Head from './components/Head';
import { AliveScope } from 'react-activation';

import './App.global.css';
import logo from '../assets/icon.svg';

const { Header } = Layout;

const openDocs = [
  { name: 'doc1', uri: '../assets/test1.pdf' },
  { name: 'doc2', uri: '../assets/test2.pdf' },
  { name: 'doc3', uri: '../assets/test3.jpg' },
];

interface IDocViewProps {
  docIdx: number
}

function Path() {
  const location = useLocation();

  return (
    <span>{location.pathname}</span>
  )
}

class DocView extends React.Component<IDocViewProps> {

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
          selectedKeys={[`${this.props.docIdx }`]}
        >
          <img
            src={logo}
            alt="PAIGE Logo"
            height="40px"
            style={{ padding: '0 30px 0 43px', fill: '#002140' }}
          />
          {openDocs.map((doc, idx) => {
            return (
              <Menu.Item key={idx}>
                <Link to={`/${doc.name}`}>
                  {doc.name}
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
      <DocUI doc={openDocs[this.props.docIdx]} />
    </Layout>
    )
  }
}

class SearchView extends React.Component {
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
        >
          <img
            src={logo}
            alt="PAIGE Logo"
            height="40px"
            style={{ padding: '0 30px 0 43px', fill: '#002140' }}
          />
          {openDocs.map((doc, idx) => {
            return (
              // <><Link to={`/${doc.name}`}>
              //   {doc.name}
              // </Link>
                <Menu.Item key={idx}>
                  <Link to={`${doc.name}`}>
                    {doc.name}
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
      <Path />
      <div>This is the asdf view</div>
    </Layout>
    )
  }
}

function App() {
  return (
    <HashRouter>
      <Head docNames={openDocs.map((doc) => doc.name)}>
        <AliveScope>
          <CacheSwitch>
            <CacheRoute exact path='/' component={Test2} />
            {openDocs.map(
              (docu, idx) =>
              <CacheRoute
                exact
                path={`/${docu.name}`}
                render={() => (<DocUI doc={openDocs[idx]}/>)}
              />)}
          </CacheSwitch>
        </AliveScope>
      </Head>
    </HashRouter>
  )
}

export default App;

function Test1() {
  return (
    <div>
      Hello!
    </div>
  )
}

function Test2() {
  return (
    <div>
      What's up?
    </div>
  )
}



// export default function App() {
//   return (
//     <HashRouter>
//       <div>
//         <Link to='/'>Home</Link>
//         <Link to='/doc1'>doc1</Link>
//         <Link to='/doc2'>doc2</Link>
//         <Link to='/doc3'>doc3</Link>
//       </div>
//       <Switch>
//         <Route exact path='/' component={Test1}/>
//         <Route exact path='/doc1' component={Test2}/>
//         <Route exact path='/doc2' component={Test1}/>
//         <Route exact path='/doc3' component={Test2}/>
//       </Switch>
//     </HashRouter>
//   )
// }



// export default function App() {
//   return (
//     <HashRouter>
//       <Link to="/">Home</Link>
//       {openDocs.map((doc) => <Link to={`/${doc.name}`}>{doc.name}</Link>)}
//       <Switch>
        // <Route path='/' component={SearchView} />
        // {openDocs.map(
        //   (doc, idx) =>
        //   <Route
        //     path={`/${doc.name}`}
        //     render={() => (<DocView docIdx={idx}/>)}
        //   />)}
//       </Switch>
//     </HashRouter>
//   );
// }









// class DocView extends React.Component<IDocViewProps> {

//   render() {
//     return (
//       <Head docNames={openDocs.map((doc) => doc.name)} curDocIdx={this.props.docIdx}>
//         <DocUI doc={openDocs[this.props.docIdx]} />
//       </Head>
//       // <Layout style={{ height: '100vh' }}>
//       //   <Header
//       //     className="header"
//       //     style={{ background: '#fff1b8', padding: '0' }}
//       //   >
//       //     <Menu
//       //       theme="light"
//       //       mode="horizontal"
//       //       style={{ background: 'none' }}
//       //       onClick={(item) => this.handleClick(item.key)}
//       //     >
//       //       <img
//       //         src={logo}
//       //         alt="PAIGE Logo"
//       //         height="40px"
//       //         style={{ padding: '0 30px 0 43px', fill: '#002140' }}
//       //       />
//       //       {openDocs.map((doc, idx) => {
//       //         return <Menu.Item key={idx}>{doc.name}</Menu.Item>;
//       //       })}
//       //     </Menu>
//       //     <Button
//       //       icon={<PlusSquareOutlined style={{ color: 'white' }} />}
//       //       size="large"
//       //       style={{ margin: '0 20px', background: '#002140' }}
//       //     />
//       //   </Header>
//       //   <DocUI doc={this.props.doc}/>
//       // </Layout>
//     );
//   };
// };

// class SearchView extends React.Component {
//   render() {
//     return (
//       <Head docNames={openDocs.map((doc) => doc.name)}>
//         <div>This is the search view</div>
//       </Head>
//     )
//   }
// }
