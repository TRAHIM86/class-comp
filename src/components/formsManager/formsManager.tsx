import { useState } from 'react';
import { Btn } from '../../ui/btn';
import { Modal } from '../modal/modal';
import { FormUnControled } from '../formUnControlled/formUnControlled';
import { FormControlled } from '../formControlled/formControlled';
import {
  formManagerStyle,
  modalBtnSend,
  usersCards,
} from '../../styles/styles';
import { useStore } from '../../store/store';

export const FormManager = () => {
  // состояние модалки (открыта/закрыта)
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
            <div key={index} className={usersCards}>
              {index + 1} Name: {user.name}, Age: {user.age}, Email:{' '}
              {user.email}, {user.gender},
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
          <FormUnControled closeModalFunc={closeModal} />
        )}
        {formType === 'controlled' && (
          <FormControlled closeModalFunc={closeModal} />
        )}
      </Modal>
    </div>
  );
};
