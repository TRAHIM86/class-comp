import { useEffect, useState } from 'react';
import { Btn } from '../../ui/btn';
import { Modal } from '../modal/modal';
import { FormUnControled } from '../formUnControlled/formUnControlled';
import { FormControlled } from '../formControlled/formControlled';
import {
  borderGreen,
  formManagerStyle,
  imageUser,
  modalBtnSend,
  usersCards,
} from '../../styles/styles';
import { useStore } from '../../store/store';

export const FormManager = () => {
  // состояние модалки (открыта/закрыта)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // состояние id последнего добаавленного юзера (для подсветки)
  const [lastId, setLastId] = useState<number | null>(null);
  console.log('lastId :', lastId);

  // состояние открываемой формы (контроль/онКонтроль)
  const [formType, setFormType] = useState<
    'uncontrolled' | 'controlled' | null
  >(null);

  // открыть модалку с передаваемой формой
  function openModal(typeForm: 'uncontrolled' | 'controlled') {
    setFormType(typeForm);
    setModalIsOpen(true);
  }

  // закрыть модалку
  function closeModal() {
    setModalIsOpen(false);
    setFormType(null);
  }

  // текущие юзеры в стор
  const users = useStore((state) => state.users);

  // функция удалить юзера
  const removeUser = useStore((state) => state.removeUser);

  // эффект для подсветки последнего добавленного юзера
  useEffect(() => {
    if (!lastId) {
      return;
    } else {
      const timer = setTimeout(() => {
        setLastId(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [lastId]);

  return (
    <div className={formManagerStyle}>
      <div>
        <Btn
          btnText="CONTROLLED FORM"
          onClickFunc={() => {
            openModal('controlled');
          }}
        ></Btn>

        <Btn
          btnText="UNCONTROLLED FORM"
          onClickFunc={() => {
            openModal('uncontrolled');
          }}
        ></Btn>
      </div>

      <div className={usersCards}>
        {users.map((user, index) => {
          return (
            <div
              key={index}
              className={`${usersCards} ${user.id === lastId ? borderGreen : ''}`}
            >
              {index + 1} Name: {user.name}, Age: {user.age}, Email:{' '}
              {user.email}, {user.gender}, {user.country}
              <img
                src={user.image || 'src/assets/imgs/default.jpg'}
                alt="avatar"
                className={imageUser}
              />
              <button
                className={modalBtnSend}
                onClick={() => removeUser(index)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <h2>{formType === 'uncontrolled' ? 'uncontrolled' : 'controlled'}</h2>
        {formType === 'uncontrolled' && (
          <FormUnControled closeModalFunc={closeModal} setLastId={setLastId} />
        )}
        {formType === 'controlled' && (
          <FormControlled closeModalFunc={closeModal} setLastId={setLastId} />
        )}
      </Modal>
    </div>
  );
};
