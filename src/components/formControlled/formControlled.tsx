import React, { useState } from 'react';
import {
  modalBtnSend,
  btnDisabled,
  modalInput,
  relative,
  eyes,
} from '../../styles/styles';
import { useStore } from '../../store/store';
import { handleImage } from '../../utils/imageHelpers';
import { Eye, EyeOff } from 'lucide-react';

export const FormControlled = ({
  closeModalFunc,
}: {
  closeModalFunc: () => void;
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(18);
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // состояние фотки в формате base64 (строка бинарная)
  const [image, setImage] = useState<string>('');

  //валидация на name и email
  const isValid =
    name.trim() !== '' &&
    age >= 18 &&
    email.includes('@') &&
    email.includes('.') &&
    isAgree;

  // функция добавить юзера в глобальный стор
  const addUser = useStore((state) => state.addUser);

  // функция отправки формы
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    addUser({
      name: name,
      age: age,
      email: email,
      gender: gender,
      image: image,
    });
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

  function changeAgree() {
    setIsAgree(!isAgree);
  }

  async function changeImage(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const result = await handleImage(e);
      if (result) {
        setImage(result);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function changePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
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

      <div>
        <label htmlFor="male">Male</label>
        <input
          id="male"
          type="radio"
          name="gender"
          value="male"
          checked={gender === 'male'}
          onChange={() => setGender('male')}
        ></input>
        <label htmlFor="female">Female</label>
        <input
          id="female"
          type="radio"
          name="gender"
          value="female"
          checked={gender === 'female'}
          onChange={() => setGender('female')}
        ></input>
      </div>

      <div>
        <label htmlFor="agree">Agree</label>
        <input type="checkbox" id="agree" required onChange={changeAgree} />
      </div>

      <div>
        <label htmlFor="image">Load photo</label>
        <input
          id="image"
          type="file"
          style={{ display: 'none' }}
          onChange={changeImage}
        />
      </div>

      <div className={relative}>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          className={`${modalInput} pr-8`}
          type={!showPassword ? 'password' : 'text'}
          value={password}
          placeholder="password"
          required
          onChange={changePassword}
        ></input>

        {!showPassword ? (
          <Eye
            className={eyes}
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <EyeOff
            className={eyes}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
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
