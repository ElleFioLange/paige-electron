/* eslint-disable react/destructuring-assignment */
import { AutoComplete, Input } from 'antd';
import React from 'react';

interface IAutoCompProps {
  style?: Record<string, unknown>;
  placeholder?: string;
}

class AutoComp extends React.Component<IAutoCompProps> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    options: [],
  };

  onSearch(searchText: string) {
    const options = !searchText
      ? []
      : [
          { value: searchText },
          { value: searchText.repeat(2) },
          { value: searchText.repeat(3) },
        ];
    this.setState({ options });
  }

  render() {
    return (
      <AutoComplete
        options={this.state.options}
        style={this.props.style}
        onSearch={(a) => {
          this.onSearch(a);
        }}
      >
        <Input.Search size="large" placeholder={this.props.placeholder} />
      </AutoComplete>
    );
  }
}

export default AutoComp;
