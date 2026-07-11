import { Btn } from '../../ui/btn';
import type { ErrorBtnProps } from '../../types';

/*
export class ErrorBtn extends React.Component<ErrorBtnProps> {
  render() {
    const { onClickErrorFunc, disabled, btnText } = this.props;

    return (
      <Btn
        disabled={disabled}
        onClickFunc={() => onClickErrorFunc()}
        btnText={btnText}
      ></Btn>
    );
  }
}
*/

export const ErrorBtn = ({
  onClickErrorFunc,
  disabled,
  btnText,
}: ErrorBtnProps) => {
  return (
    <Btn
      onClickFunc={() => onClickErrorFunc()}
      disabled={disabled}
      btnText={btnText}
    />
  );
};
