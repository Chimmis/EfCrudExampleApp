import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (
  <div>
    <h1>Welcome to the Book store!</h1>
  </div>
);

export default connect()(Home);
