import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import DocUI from './components/DocUI'
import Head from './components/Head';

import './App.global.css';

const openDocs = [
  { name: 'doc1', uri: '../assets/test1.pdf' },
  { name: 'doc2', uri: '../assets/test2.pdf' },
  { name: 'doc3', uri: '../assets/test3.jpg' },
];

interface IDocViewProps {
  docIdx: number
}

class DocView extends React.Component<IDocViewProps> {

  render() {
    return (
      <Head docNames={openDocs.map((doc) => doc.name)} curDocIdx={this.props.docIdx}>
        <DocUI doc={openDocs[this.props.docIdx]} />
      </Head>
    )
  }
}

class SearchView extends React.Component {
  render() {
    return (
      <Head docNames={openDocs.map((doc) => doc.name)} curDocIdx={null}>
        <div>
          Hello!
        </div>
      </Head>
    )
  }
}


export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' component={SearchView} />
        {openDocs.map((doc, idx) => {
          return (
            <Route path={`/${doc.name}`} render={() => <DocView docIdx={idx} /> }/>
          )
        })}
      </Switch>
    </HashRouter>
  )
};
