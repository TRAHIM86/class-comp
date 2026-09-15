import Requests from '../../requests';
import { errorBlock } from '../../styles/styles';
import type { ErrorRequest } from '../../types';
import { ErrorBtn } from './errorBtn';

export const ErrorBlock = ({
  isLoading,
  setRenderError,
  setErrorRequest,
}: {
  isLoading: boolean;
  setRenderError: (value: number[]) => void;
  setErrorRequest: (value: ErrorRequest) => void;
}) => {
  // блок с имитацией ошибок
  async function imitateErrorRender() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('render error');

    // @ts-expect-error - имитация ошибки для ErrorBoundary
    setRenderError('123');
  }

  async function fetchError4xx() {
    console.log('imitation4xx');
    const error4xx = await Requests.imitation4xx();

    if (error4xx) {
      console.log('error4xx :', error4xx);
      setErrorRequest(error4xx);
    }
  }

  async function fetchErrorNetwork() {
    const errorNetwork = await Requests.imitationErrNetwork();

    setErrorRequest({ isError: true, status: 'Unknown error' });

    return errorNetwork;
  }

  return (
    <div data-testid="error-block" className={errorBlock}>
      <ErrorBtn
        btnText="render error"
        disabled={isLoading}
        onClickErrorFunc={imitateErrorRender}
      />
      <ErrorBtn
        btnText="404 error (!response.ok)"
        disabled={isLoading}
        onClickErrorFunc={fetchError4xx}
      />
      <ErrorBtn
        btnText="network error (catch)"
        disabled={isLoading}
        onClickErrorFunc={fetchErrorNetwork}
      />
    </div>
  );
};
