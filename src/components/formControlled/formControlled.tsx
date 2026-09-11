import { useState } from 'react';
import {
  modalBtnSend,
  btnDisabled,
  modalInput,
  eyes,
  flexRow,
  opacity,
  hints,
} from '../../styles/styles';
import { useStore } from '../../store/store';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';

// схема валидации на форму (zod)
import { userSchema } from '../../schemas/userSchema';

// zodResolver - это адаптер, который связывает Zod-схему
// с React Hook Form для валидации
import { zodResolver } from '@hookform/resolvers/zod';
import type { FormData } from '../../types';
import { fileToBase64 } from '../../utils/imageHelpers';
import { checkPassword } from '../../utils/passwordHelpers';

export const FormControlled = ({
  closeModalFunc,
  setLastId,
}: {
  closeModalFunc: () => void;
  setLastId: (id: number) => void;
}) => {
  // показывать/скрывать пароли
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  // список стран из стора
  const countriesEU = useStore((state) => state.countries);

  // вызываем нашу функцию-схему валидации (передаем список стран)
  const schemaValid = userSchema(countriesEU);

  // управление формой через useForm
  const {
    register, // функция для привязки инпутов в форме
    handleSubmit, // функция для обработки отправки формы
    watch, // функция для получения текущего значения поля
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schemaValid),
    mode: 'onChange',

    // собирает ВСЕ ошибки (при пароле покажет все 4, а не только первую)
    criteriaMode: 'all',
  });

  // тесты на сложность пароля (для рендера чего не хватает)

  const currentPassword = watch('password') || '';

  const { hasDigit, hasUpperCase, hasLowerCase, hasSpecial } =
    checkPassword(currentPassword);

  // функция добавить юзера в глобальный стор
  const addUser = useStore((state) => state.addUser);

  // функция отправки формы
  async function submitForm(data: FormData) {
    const base64Img = await fileToBase64(data.image[0]);

    const userId = Date.now();

    addUser({
      id: userId,
      name: data.name,
      age: data.age,
      email: data.email,
      gender: data.gender,
      image: base64Img,
      password: data.password,
      country: data.country,
    });

    setLastId(userId);
    closeModalFunc();
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          className={modalInput}
          type="text"
          placeholder="Name"
          autoFocus
          {...register('name')}
        />
        {errors.name && <p className={hints}>{String(errors.name.message)}</p>}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          className={modalInput}
          type="number"
          placeholder="Age"
          {...register('age')}
        />
        {errors.age && <p className={hints}>{errors.age.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          className={modalInput}
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && <p className={hints}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="male">Male</label>
        <input
          id="male"
          type="radio"
          value="male"
          {...register('gender')}
        ></input>
        <label htmlFor="female">Female</label>
        <input
          id="female"
          type="radio"
          value="female"
          {...register('gender')}
        ></input>
        {(errors.gender || !watch('gender')) && (
          <p className={hints}>{errors.gender?.message || 'Select gender'}</p>
        )}
      </div>

      <div>
        <label htmlFor="agree">Agree</label>
        <input type="checkbox" id="agree" {...register('agree')} />
        {(errors.agree || !watch('agree')) && (
          <p className={hints}>{errors.agree?.message || 'Accept the terms'}</p>
        )}
      </div>

      <div>
        <label htmlFor="image">Load photo</label>
        <input
          id="image"
          type="file"
          style={{ display: 'none' }}
          {...register('image')}
        />
        {errors.image && <p className={hints}>{errors.image.message}</p>}
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
              placeholder="password"
              {...register('password')}
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
              placeholder="confirm"
              {...register('confirm')}
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
        </div>
        {errors.confirm && <p className={hints}>{errors.confirm.message}</p>}
      </div>

      <div>
        <input
          className={modalInput}
          type="text"
          list="countriesEU"
          {...register('country')}
        />
        <datalist id="countriesEU">
          {countriesEU.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {(errors.country || !watch('country')) && (
          <p className={hints}>
            {errors.country?.message || 'Select a country from the list'}
          </p>
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
