import React from 'react';
import { MainPage } from './assets/pages/mainPage';
import { app } from './styles/styles';

class App extends React.Component {
  render() {
    return (
      <div className={app}>
        <MainPage></MainPage>
      </div>
    );
  }
}

export default App;
