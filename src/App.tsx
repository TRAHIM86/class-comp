import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainPage } from './pages/mainPage';
import { app } from './styles/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation/navigation';
import { HeroData } from './components/heroData/heroData';
import { ErrorPage404 } from './pages/errorPage404';
import { About } from './pages/about';
import { ThemeProvider } from './store/ThemeContext';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={app}>
        <ThemeProvider>
          <BrowserRouter basename="/class-comp/">
            <Navigation />

            <Routes>
              <Route
                path="/"
                element={<MainPage data-testid="main-page" />}
              ></Route>

              <Route
                path="/:pageId"
                element={<MainPage data-testid="main-page" />}
              >
                <Route path=":heroId" element={<HeroData />} />
              </Route>

              <Route path="/about" element={<About />} />
              <Route path="/*" element={<ErrorPage404 />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </QueryClientProvider>
  );
};

export default App;
