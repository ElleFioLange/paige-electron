import React from 'react';
import { Tabs } from 'antd';
import SiderSwitch from './Siders';

export default class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: 'search',
    };
  }

  render() {
    const { activeKey } = this.state;
    const { children } = this.props;
    return (
      <>
        {SiderSwitch(activeKey)}
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Tabs
            activeKey={activeKey}
            onChange={(key) => this.setState({ activeKey: key })}
            tabBarStyle={{
              height: '49px',
              backgroundColor: '#0c304d',
              padding: '0 24px',
              margin: '0',
            }}
            tabPosition="bottom"
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            {children}
          </Tabs>
        </div>
      </>
    );
  }
}
