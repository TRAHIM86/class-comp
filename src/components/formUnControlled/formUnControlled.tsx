import { useRef, useState } from 'react';
import { btnDisabled, modalBtnSend } from '../../styles/styles';
import { useStore } from '../../store/store';

export const FormUnControled = ({
  closeModalFunc,
}: {
  closeModalFunc: () => void;
}) => {
  // рефы для полей
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // состояния валидна ли форма
  const [isValid, setIsValid] = useState(false);

  // функция проверки валидности формы
  function isValidForm() {
    const name = nameRef.current?.value || '';
    const age = ageRef.current?.value || 18;
    const email = emailRef.current?.value || '';

    setIsValid(
      name.trim() !== '' &&
        email.includes('@') &&
        email.includes('.') &&
        age >= 18
    );
  }

  // функция добавить юзера в глобальный стор
  const addUser = useStore((state) => state.addUser);

  // функция отправки формы
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    addUser({
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
    });
    console.log('USERS', useStore.getState().users);

    if (nameRef.current) {
      nameRef.current.value = '';
    }

    if (emailRef.current) {
      emailRef.current.value = '';
    }

    closeModalFunc();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            placeholder="Name"
            autoFocus
            ref={nameRef}
            onChange={isValidForm}
          />
        </label>
      </div>

      <div>
        <label>
          Age:
          <input
            type="number"
            placeholder="Age"
            ref={ageRef}
            onChange={isValidForm}
          />
        </label>
      </div>

      <div>
        <label>
          Email:
          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
            onChange={isValidForm}
          />
        </label>
      </div>

      <button
        className={`${modalBtnSend} ${!isValid ? btnDisabled : ''}`}
        type="submit"
        disabled={!isValid}
      >
        SEND
      </button>
    </form>
  );
};
