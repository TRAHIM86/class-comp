import { useState } from 'react';
import { modalBtnSend } from '../../styles/styles';
import { useStore } from '../../store/store';

export const FormControlled = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // функция добавить юзера в глобальный стор
  const addUser = useStore((state) => state.addUser);

  // функция отправки формы
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    addUser({ name: name, email: email });
    console.log('USERS', useStore.getState().users);

    setName('');
    setEmail('');
  }

  function changeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            placeholder="Name"
            autoFocus
            onChange={(e) => {
              changeName(e);
            }}
          />
        </label>
      </div>

      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              changeEmail(e);
            }}
          />
        </label>
      </div>

      <button className={modalBtnSend} type="submit">
        SEND
      </button>
    </form>
  );
};
