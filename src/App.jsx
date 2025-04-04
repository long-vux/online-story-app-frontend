import React, { Component } from 'react';
import './components/login_style.css';
import './components/homepage.css';
import {HomepageLogin} from './components/login';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Error: {this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <div>
        <HomepageLogin/>
      </div>
    </ErrorBoundary>
  );
}

export default App;