import React from 'react';
import { MainPage } from './pages/mainPage';
import { app } from './styles/styles';

class App extends React.Component {
  render() {
    return (
      <div className={app}>
        <MainPage data-testid="main-page" />
      </div>
    );
  }
}

export default App;
