import React, { useRef, useState } from 'react';
import {
  eyes,
  flexRow,
  hints,
  modalBtnSend,
  modalInput,
  opacity,
} from '../../styles/styles';
import { useStore } from '../../store/store';
import { fileToBase64 } from '../../utils/imageHelpers';
import { Eye, EyeOff } from 'lucide-react';
import { checkPassword } from '../../utils/passwordHelpers';

// схема валидации на форму (zod)
import { userSchema } from '../../schemas/userSchema';

export const FormUnControled = ({
  closeModalFunc,
  setLastId,
}: {
  closeModalFunc: () => void;
  setLastId: (id: number) => void;
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
  const confirmRef = useRef<HTMLInputElement>(null);
  const counryRef = useRef<HTMLInputElement>(null);

  // текущий пароль из инпута (для проверки на сложность)
  const [currentPassword, setCurrentPassword] = useState('');

  // список стран из стора
  const countriesEU = useStore((state) => state.countries);

  // сотояния ошибок валидации по схеме. Тип Record -
  // ключи - строки, значения - строки
  const [errors, setErrors] = useState<Record<string, string>>({});

  // состояние показывать/скрыть пароль
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  // вызываем нашу функцию-схему валидации (передаем список стран)
  const schemaValid = userSchema(countriesEU);

  // функция добавить юзера в глобальный стор
  const addUser = useStore((state) => state.addUser);

  /******** тесты на содержание символов в пароле ************/
  const { hasDigit, hasUpperCase, hasLowerCase, hasSpecial } =
    checkPassword(currentPassword);

  // функция отправки формы
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value || '',
      email: emailRef.current?.value || '',
      gender: maleRef.current?.checked
        ? 'male'
        : femaleRef.current?.checked
          ? 'female'
          : '',
      agree: igreeRef.current?.checked || false,
      image: imageRef.current?.files,
      password: passwordRef.current?.value || '',
      confirm: confirmRef.current?.value || '',
      country: counryRef.current?.value || '',
    };

    // safeParse не бросает исключение. Вернет или результат
    // или объект с полем success: false и ошибками
    const result = schemaValid.safeParse(formData);

    // еcли валидация не порошла
    if (!result.success) {
      // создать объект для ошибок
      const newErrors: Record<string, string> = {};

      // result.error.issues — массив ошибок от Zod
      // Каждая ошибка содержит path (имя поля) и message (текст)
      result.error.issues.forEach((issue) => {
        newErrors[String(issue.path[0])] = issue.message;
      });

      console.log('newErrors:', newErrors);
      console.log('result:', result);

      // сохранить ошибки с стейт
      setErrors(newErrors);

      return;
    } else {
      // если валидация прошла
      setErrors({});

      const base64 = await fileToBase64(result.data.image[0]);

      const userId = Date.now();

      addUser({
        ...result.data,
        id: userId,
        image: base64,
      });
      setLastId(userId);
      console.log('USERS', useStore.getState().users);
    }

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
        />
        {errors.name && <p className={hints}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          placeholder="Age"
          ref={ageRef}
          defaultValue="18"
        />
        {errors.age && <p className={hints}>{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" placeholder="Email" ref={emailRef} />
        {errors.email && <p className={hints}>{errors.email}</p>}
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
        {errors.gender && <p className={hints}>{errors.gender}</p>}
      </div>

      <div>
        <label htmlFor="agree">Agree</label>
        <input type="checkbox" id="agree" ref={igreeRef} />
        {errors.agree && <p className={hints}>{errors.agree}</p>}
      </div>

      <div>
        <label htmlFor="image">Load photo</label>
        <input
          id="image"
          ref={imageRef}
          type="file"
          style={{ display: 'none' }}
        />
        {errors.image && <p className={hints}>{errors.image}</p>}
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
              onChange={(e) => setCurrentPassword(e.target.value)}
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

        <div className={`${flexRow} gap-4`}>
          <div className={`${hints} ${hasDigit ? hints : opacity}`}>
            &nbsp;1 digit
          </div>
          <div className={`${hints} ${hasUpperCase ? hints : opacity}`}>
            &nbsp;1 UP letter
          </div>
          <div className={`${hints} ${hasLowerCase ? hints : opacity}`}>
            &nbsp;1 low letter
          </div>
          <div className={`${hints} ${hasSpecial ? hints : opacity}`}>
            &nbsp;1 special
          </div>
        </div>
      </div>

      <div>
        <div className="flex">
          <label htmlFor="confirm" className="whitespace-nowrap">
            Confirm:
          </label>
          <div className="relative w-1/2">
            <input
              id="confirm"
              className={`${modalInput} w-full pr-8`}
              type={!showConfirm ? 'password' : 'text'}
              ref={confirmRef}
              placeholder="confirm"
            />
            {!showConfirm ? (
              <Eye
                className={eyes}
                onClick={() => setShowConfirm(!showConfirm)}
              />
            ) : (
              <EyeOff
                className={eyes}
                onClick={() => setShowConfirm(!showConfirm)}
              />
            )}
          </div>
          {errors.confirm && <p className={hints}>{errors.confirm}</p>}
        </div>
      </div>

      <div>
        <input
          className={modalInput}
          type="text"
          list="countriesEU"
          ref={counryRef}
        />
        <datalist id="countriesEU">
          {countriesEU.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && <p className={hints}>{errors.country}</p>}
      </div>

      <button className={`${modalBtnSend}`} type="submit">
        SEND
      </button>
    </form>
  );
};
