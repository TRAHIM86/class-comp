import { MainPage } from './pages/mainPage';
import { app } from './styles/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation/navigation';
import { HeroData } from './components/heroData/heroData';
import { ErrorPage404 } from './pages/errorPage404';
import { About } from './pages/about';

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

          <Route path="/:pageId" element={<MainPage data-testid="main-page" />}>
            <Route path=":heroId" element={<HeroData />} />
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="/*" element={<ErrorPage404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
