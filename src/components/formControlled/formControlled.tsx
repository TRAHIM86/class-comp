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
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isAgree, setIsAgree] = useState<boolean>(false);

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

  // функция выбора и загрузки картинки
  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    // выбранный файл [0] в инпуте файлов
    const currentFile = e.target.files?.[0];

    // если файла нет - выходим
    if (!currentFile) {
      return;
    }

    // проверяем тип файла Если не (png, jpeg) алерт и выходим.
    if (!['image/png', 'image/jpeg'].includes(currentFile.type)) {
      alert('Only PNG or JPEG format image');
      return;
    }

    // проверяем размер. Если больше 5 - возврат
    if (currentFile.size > 5 * 1024 * 1024) {
      alert('Size image must not be more 5 MB');
      return;
    }

    // создаем экземпляр FileReader - объект который читает
    // преобразовывает файлы в разыне форматы
    const reader = new FileReader();

    // приклеиваем функцию, которая выполнится когда файл прочитается
    // onloadend - это евент, который сработает после чтения файла
    reader.onloadend = () => {
      // только строка! reader.result — это результат чтения файла
      // это строка base64

      if (typeof reader.result === 'string') {
        // поместить в состояние image текущую строку base64
        setImage(reader.result);
      }
    };

    // readAsDataURL - втроенный метод, читает файл и преобразует его
    // в data URL (т.е. строку, начинающуюся с data:image/png;base64)
    // после преобразования в строку вызывается авт-ки reader.onloadend
    reader.readAsDataURL(currentFile);
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
          onChange={handleImage}
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
