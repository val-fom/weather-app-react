import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListContainer extends Component {
  state = {
    list: JSON.parse(localStorage.getItem(this.props.listName)) || [],
  };

  shouldComponentUpdate(nextProps, nextState) {
    const lastCity = this.state.list.slice(-1)[0];
    if (!lastCity) return true; // list is empty => should update (SU)
    return nextProps.cityId !== lastCity.cityId; // `new` city !== `last` city => SU
  }

  componentDidUpdate() {
    if (this.props.listName === 'history') this.add();
  }

  add = () => {
    const { cityName, cityId, listName } = this.props;
    const list = this.state.list
      .slice()
      .filter(item => item.cityName !== cityName);
    // ^ to move existing city to the end of the list
    list.push({ cityName, cityId });
    localStorage.setItem(listName, JSON.stringify(list));
    this.setState({ list });
  };

  clear = () => {
    const { listName } = this.props;
    localStorage.removeItem(listName);
    this.setState({ list: [] });
    this.forceUpdate(); // to force update skipping SCU
  };

  // handleClick = ev => {
  //   ev.preventDefault();
  //   const city = ev.target.innerHTML;
  //   this.props.search(city);
  // };

  render() {
    const { list } = this.state;
    const { ListView, search } = this.props;

    return (
      <ListView
        list={list}
        search={this.search}
        add={this.add}
        clear={this.clear}
      />
    );
  }
}

// ListContainer.propTypes = {
//   cityName: PropTypes.string.isRequired,
//   cityId: PropTypes.number.isRequired,
//   listName: PropTypes.string.isRequired,
//   ListView: PropTypes.func.isRequired,
//   search: PropTypes.func.isRequired,
// };
