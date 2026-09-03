import React, { useState } from 'react';
import { modalBtnSend, btnDisabled, modalInput } from '../../styles/styles';
import { useStore } from '../../store/store';

export const FormControlled = ({
  closeModalFunc,
}: {
  closeModalFunc: () => void;
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(18);
  const [email, setEmail] = useState('');

  //валидация на name и email
  const isValid =
    name.trim() !== '' && email.includes('@') && email.includes('.');

  // функция добавить юзера в глобальный стор
  const addUser = useStore((state) => state.addUser);

  // функция отправки формы
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    addUser({ name: name, age: age, email: email });
    console.log('USERS', useStore.getState().users);

    setName('');
    setEmail('');
    closeModalFunc();
  }

  /************* функции изменения полей *************/
  function changeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function changeAge(e: React.ChangeEvent<HTMLInputElement>) {
    setAge(Number(e.target.value));
  }

  function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          className={modalInput}
          type="text"
          value={name}
          placeholder="Name"
          autoFocus
          required
          onChange={(e) => {
            changeName(e);
          }}
        />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          className={modalInput}
          type="number"
          value={age}
          placeholder="Age"
          required
          onChange={(e) => {
            changeAge(e);
          }}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          className={modalInput}
          type="email"
          value={email}
          placeholder="Email"
          required
          onChange={(e) => {
            changeEmail(e);
          }}
        />
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
