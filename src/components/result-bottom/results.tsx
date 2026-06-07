import { errorMessage, result_sec } from '../../styles/styles';
import { TableResult } from './tableresult';
import type { PeopleResponse, StateError } from '../../types';

export const Result = ({
  heroes,
  stateError,
}: {
  heroes: PeopleResponse;
  stateError?: StateError | null;
}) => {
  return (
    <section data-testid="result" className={result_sec}>
      {stateError?.isError ? (
        <div className={errorMessage}>
          Error. Status: {stateError.errorStatus}. Please try again.
        </div>
      ) : (
        <TableResult heroes={heroes} />
      )}
    </section>
  );
};
