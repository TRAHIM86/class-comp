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
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);

  // состояния валидна ли форма
  const [isValid, setIsValid] = useState(false);

  // функция проверки валидности формы
  function isValidForm() {
    const name = nameRef.current?.value || '';
    const age = Number(ageRef.current?.value) || 18;
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
      gender: maleRef.current?.checked ? 'male' : 'female',
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
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          autoFocus
          ref={nameRef}
          onChange={isValidForm}
        />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          placeholder="Age"
          ref={ageRef}
          onChange={isValidForm}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          ref={emailRef}
          onChange={isValidForm}
        />
      </div>

      <div>
        <label htmlFor="male">Male</label>
        <input
          id="male"
          type="radio"
          name="gender"
          value="male"
          ref={maleRef}
        ></input>
        <label htmlFor="female">Female</label>
        <input
          id="female"
          type="radio"
          name="gender"
          value="female"
          ref={femaleRef}
        ></input>
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
