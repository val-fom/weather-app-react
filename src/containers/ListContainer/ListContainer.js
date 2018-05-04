import React, { Component } from 'react';

export default class ListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Inner: this.props.inner,
      listName: this.props.listName,
      list: JSON.parse(localStorage.getItem('favourites')) || [],
    };
  }

  getSnapshotBeforeUpdate() {
    if (this.state.listName === 'history') this.add();
  }

  add = () => {
    const { listName } = this.state;
    const { city } = this.props;
    const list = this.state.list.slice();
    const index = list.indexOf(city);
    if (city === list[list.length - 1]) return;
    if (~index) list.splice(index, 1);
    // ^ to move existing city to the end of the list
    list.push(city);
    localStorage.setItem(listName, JSON.stringify(list));
    this.setState({ list });
  };

  clear = () => {
    const { listName } = this.state;
    localStorage.removeItem(listName);
    this.setState({ list: [] });
  };

  handleClick = ev => {
    ev.preventDefault();
    const city = ev.target.innerHTML;
    this.props.handleClick(city);
  };

  render() {
    const { Inner, list } = this.state;

    if (!Inner) return null;

    return <Inner list={list} handleClick={this.handleClick} add={this.add} clear={this.clear} />;
  }
}
