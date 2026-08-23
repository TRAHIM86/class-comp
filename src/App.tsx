import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainPage } from './pages/mainPage';
import { app } from './styles/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation/navigation';
import { HeroData } from './components/heroData/heroData';
import { ErrorPage404 } from './pages/errorPage404';
import { About } from './pages/about';
import { ThemeProvider } from './store/ThemeContext';
import { useState } from 'react';
import { Modal } from './components/modal/modal';
import { Btn } from './ui/btn';
import { FormUnControled } from './components/formUnControlled/formUnControlled';
import { FormControlled } from './components/formControlled/formControlled';

export const App = () => {
  const queryClient = new QueryClient();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [formType, setFormType] = useState<
    'uncontrolled' | 'controlled' | null
  >(null);

  function openModal(typeForm: 'uncontrolled' | 'controlled') {
    setFormType(typeForm);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setFormType(null);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className={app}>
        <ThemeProvider>
          <BrowserRouter basename="/class-comp/">
            <Navigation />

            <Btn
              btnText="OPEN UNCONTROLLED FORM"
              onClickFunc={() => {
                openModal('uncontrolled');
              }}
            ></Btn>

            <Btn
              btnText="OPEN CONTROLLED FORM"
              onClickFunc={() => {
                openModal('controlled');
              }}
            ></Btn>

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

            <Modal isOpen={modalIsOpen} onClose={closeModal}>
              <h2>
                {formType === 'uncontrolled' ? 'uncontrolled' : 'controlled'}
              </h2>
              {formType === 'uncontrolled' && <FormUnControled />}
              {formType === 'controlled' && <FormControlled />}
            </Modal>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </QueryClientProvider>
  );
};

export default App;
