import { MainPage } from './pages/mainPage';
import { app } from './styles/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation/navigation';

export const App = () => {
  return (
    <div className={app}>
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route
            path="/"
            element={<MainPage data-testid="main-page" />}
          ></Route>

          <Route
            path="/page/:pageId"
            element={<MainPage data-testid="main-page" />}
          ></Route>

          <Route path="/about" element={<div>ABOUT</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
