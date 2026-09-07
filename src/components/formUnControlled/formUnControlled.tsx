import React, { useRef, useState } from 'react';
import {
  btnDisabled,
  eyes,
  flexRow,
  modalBtnSend,
  modalInput,
  opacity,
} from '../../styles/styles';
import { useStore } from '../../store/store';
import { handleImage } from '../../utils/imageHelpers';
import { Eye, EyeOff } from 'lucide-react';
import { passwordComplexity } from '../../utils/passwordHelpers';

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
  const igreeRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // состояния валидна ли форма
  const [isValid, setIsValid] = useState(false);

  // состяние строки картинки в формате base64
  const [image, setImage] = useState<string>('');

  // состояние сложности пароля
  const [passwordDifficult, setPasswordDifficult] = useState({
    hasDigit: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecial: false,
    isPasswordDifficult: false,
  });

  // состояние показывать/скрыть пароль
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // функция проверки валидности формы
  function isValidForm() {
    const nameValid = nameRef.current?.value || '';
    const ageValid = Number(ageRef.current?.value) || 18;
    const emailValid = emailRef.current?.value || '';
    const igreeValid = igreeRef.current?.checked || false;
    const passwordValid = passwordComplexity(
      passwordRef.current?.value || ''
    ).isPasswordDifficult;

    setIsValid(
      nameValid.trim() !== '' &&
        ageValid >= 18 &&
        emailValid.includes('@') &&
        emailValid.includes('.') &&
        igreeValid &&
        passwordValid
    );
  }

  // функция добавить юзера в глобальный стор
  const addUser = useStore((state) => state.addUser);

  /******** тесты на содержание символов в пароле ************/
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const checkPassword = passwordComplexity(e.target.value);
    setPasswordDifficult(checkPassword);
    isValidForm();
  }

  // функция отправки формы
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    addUser({
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
      gender: maleRef.current?.checked ? 'male' : 'female',
      image: image,
      password: passwordRef.current?.value || '',
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

  // функция выбора и загрузки картинки
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
          defaultValue="18"
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
          onChange={isValidForm}
          defaultChecked
        ></input>
        <label htmlFor="female">Female</label>
        <input
          id="female"
          type="radio"
          name="gender"
          value="female"
          ref={femaleRef}
          onChange={isValidForm}
        ></input>
      </div>

      <div>
        <label htmlFor="agree">Agree</label>
        <input
          type="checkbox"
          id="agree"
          ref={igreeRef}
          required
          onChange={isValidForm}
        />
      </div>

      <div>
        <label htmlFor="image">Load photo</label>
        <input
          id="image"
          ref={imageRef}
          type="file"
          style={{ display: 'none' }}
          onChange={changeImage}
        />
      </div>

      <div>
        <div className="flex">
          <label htmlFor="password" className="whitespace-nowrap">
            Password:
          </label>
          <div className="relative w-1/2">
            <input
              id="password"
              className={`${modalInput} w-full pr-8`}
              type={!showPassword ? 'password' : 'text'}
              ref={passwordRef}
              placeholder="password"
              required
              onChange={handlePasswordChange}
            />
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
        </div>

        <div className={flexRow}>
          <div className={passwordDifficult.isPasswordDifficult ? '' : opacity}>
            Min
          </div>
          <div className={passwordDifficult.hasDigit ? '' : opacity}>
            &nbsp;1 digit
          </div>
          <div className={passwordDifficult.hasUpperCase ? '' : opacity}>
            &nbsp;1 UP letter
          </div>
          <div className={passwordDifficult.hasLowerCase ? '' : opacity}>
            &nbsp;1 low letter
          </div>
          <div className={passwordDifficult.hasSpecial ? '' : opacity}>
            &nbsp;1 special
          </div>
        </div>
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
