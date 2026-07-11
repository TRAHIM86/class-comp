import { errorMessage, result_sec } from '../../styles/styles';
import { TableResult } from './tableresult';
import type { ErrorRequest, PeopleResponse } from '../../types';

export const Result = ({
  heroes,
  error,
  renderError,
  errorRequest,
}: {
  heroes: PeopleResponse;
  error?: Error | null;
  renderError: number[];
  errorRequest: ErrorRequest | null;
}) => {
  return (
    <section data-testid="result" className={result_sec}>
      {renderError?.map((num) => (
        <div key={num}></div>
      ))}

      {error || errorRequest ? (
        <div className={errorMessage}>
          Error. Status: {error?.message || errorRequest?.status}. Please try
          again.
        </div>
      ) : (
        <TableResult heroes={heroes} />
      )}
    </section>
  );
};
