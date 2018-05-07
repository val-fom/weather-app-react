import React, { Component } from 'react';

export default class ListContainer extends Component {
  state = {
    list: JSON.parse(localStorage.getItem('favourites')) || [],
  };

  shouldComponentUpdate(nextProps, nextState) {
    const lastCity = this.state.list.slice(-1)[0];
    if (!lastCity) return true; // list is empty => should update (SU)
    return nextProps.city !== lastCity.city; // `new` city !== `last` city => SU
  }

  componentDidUpdate() {
    if (this.props.listName === 'history') this.add();
  }

  add = () => {
    // const { listName } = this.state;
    const { city, id, listName } = this.props;
    const list = this.state.list.slice().filter(item => item.city !== city);
    // to move existing city to the end of ^ the list
    list.push({ city, id });
    localStorage.setItem(listName, JSON.stringify(list));
    this.setState({ list });
  };

  clear = () => {
    const { listName } = this.props;
    localStorage.removeItem(listName);
    this.setState({ list: [] });
    this.forceUpdate(); // to force update skipping SCU
  };

  handleClick = ev => {
    ev.preventDefault();
    const city = ev.target.innerHTML;
    this.props.handleClick(city);
  };

  render() {
    const { list } = this.state;
    const { ListView } = this.props;

    return (
      <ListView
        list={list}
        handleClick={this.handleClick}
        add={this.add}
        clear={this.clear}
      />
    );
  }
}
