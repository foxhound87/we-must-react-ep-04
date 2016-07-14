import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Layout extends Component {

  static fetchData() {} // will be used for server side rendering

  static propTypes = {
    children: React.PropTypes.object,
  }

  render() {
    return (
      <div>
        <h1>Layout</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/test">Test</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
