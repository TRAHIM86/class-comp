import { useRef } from 'react';

export const FormUnControled = () => {
  // рефы для полей
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // функция отправки формы
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log('Name:', nameRef.current?.value);
    console.log('Email:', emailRef.current?.value);
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

      <button type="submit">SEND</button>
    </form>
  );
};
