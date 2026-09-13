import { useEffect, useState } from 'react';
import { Btn } from '../../ui/btn';
import { Modal } from '../modal/modal';
import { FormUnControled } from '../formUnControlled/formUnControlled';
import { FormControlled } from '../formControlled/formControlled';
import {
  borderGreen,
  flexCol,
  flexRow,
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
      <div className={`${flexRow} justify-between gap-2 p-1`}>
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

      <div className={`${usersCards} ${flexCol} gap-2`}>
        {users.map((user, index) => {
          return (
            <div
              key={index}
              className={`${flexRow} p-1 bg-gray-500 gap-2 rounded-md ${user.id === lastId ? borderGreen : ''}`}
            >
              <img
                src={user.image || 'src/assets/imgs/default.jpg'}
                alt="avatar"
                className={imageUser}
              />

              <div className={`${flexCol}`}>
                <div className={`${flexRow} justify-between w-100`}>
                  <p className={`${'text-2xl'}`}>{user.name}</p>
                  <p>{user.email}</p>
                </div>

                <div className={`${flexRow} justify-between w-100`}>
                  <div className={`${flexRow} gap-2`}>
                    <span>{user.age} y,</span>
                    <span>{user.gender},</span>
                    <span>{user.country}</span>
                  </div>
                </div>
                <div className={`${flexRow} justify-end`}>
                  <button
                    className={`${modalBtnSend} text-sm`}
                    onClick={() => removeUser(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <h2>
          {formType === 'uncontrolled'
            ? 'Uncontrolled form'
            : 'Controlled form'}
        </h2>
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
