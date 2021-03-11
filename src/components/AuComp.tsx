import { AutoComplete, Input } from 'antd';
import React from 'react';

interface IAuCompProps {
  style?: object;
  placeholder?: string;
}

class AuComp extends React.Component<IAuCompProps> {
  state = {
    options: []
  };

  onSearch(searchText: string) {
    var options = !searchText ? [] : [{ value: searchText }, { value: searchText.repeat(2) }, { value: searchText.repeat(3) }]
    this.setState({ options: options })
  }

  render() {
    return (
      <AutoComplete
        options={this.state.options}
        style={this.props.style}
        onSearch={(a) => {this.onSearch(a)}}
      >
        <Input.Search size="large" placeholder={this.props.placeholder} />
      </AutoComplete>
    )
  }
}

export default AuComp
