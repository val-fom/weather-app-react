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

  shouldComponentUpdate(nextProps, nextState) {
    const lastCity = this.state.list.slice(-1)[0];
    if (!lastCity) return true; // list is empty => should update (SU)
    return nextProps.city !== lastCity.city; // `new` city !== `last` city => SU
  }

  componentDidUpdate() {
    if (this.state.listName === 'history') this.add();
  }

  add = () => {
    const { listName } = this.state;
    const { city, id } = this.props;
    const list = this.state.list.slice().filter(item => item.city !== city);
    // to move existing city to the end of ^ the list
    list.push({ city, id });
    localStorage.setItem(listName, JSON.stringify(list));
    this.setState({ list });
  };

  clear = () => {
    const { listName } = this.state;
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
    const { Inner, list } = this.state;

    if (!Inner) return null;

    return <Inner list={list} handleClick={this.handleClick} add={this.add} clear={this.clear} />;
  }
}
