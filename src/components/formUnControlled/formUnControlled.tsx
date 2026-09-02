import { useRef } from 'react';
import { modalBtnSend } from '../../styles/styles';
import { useStore } from '../../store/store';

export const FormUnControled = () => {
  // рефы для полей
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // функция добавить юзера в глобальный стор
  const addUser = useStore((state) => state.addUser);

  // функция отправки формы
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    addUser({
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
    });
    console.log('USERS', useStore.getState().users);

    if (nameRef.current) {
      nameRef.current.value = '';
    }

    if (emailRef.current) {
      emailRef.current.value = '';
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" placeholder="Name" autoFocus ref={nameRef} />
        </label>
      </div>

      <div>
        <label>
          Email:
          <input type="email" placeholder="Email" ref={emailRef} />
        </label>
      </div>

      <button className={modalBtnSend} type="submit">
        SEND
      </button>
    </form>
  );
};
