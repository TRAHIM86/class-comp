import React from 'react';

interface InputProps {
  value: string;
  onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export class InputSearch extends React.Component<InputProps> {
  render() {
    return (
      <input
        name="search"
        value={this.props.value}
        onChange={this.props.onChangeFunc}
        className="border p-2"
      ></input>
    );
  }
}
