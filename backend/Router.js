import React from 'react';
const bcrypt = require('bcrypt');

class Router {
  constructor(app, db) {
    super(props);
    this.login(app, db);
  }
  render() {
    return <div>Router</div>;
  }
}

module.exports = Router;
