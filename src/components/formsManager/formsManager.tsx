import { useState } from 'react';
import { Btn } from '../../ui/btn';
import { Modal } from '../modal/modal';
import { FormUnControled } from '../formUnControlled/formUnControlled';
import { FormControlled } from '../formControlled/formControlled';

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

  return (
    <div>
      <Btn
        btnText="UNCONTROLLED FORM"
        onClickFunc={() => {
          openModal('uncontrolled');
        }}
      ></Btn>

      <Btn
        btnText="CONTROLLED FORM"
        onClickFunc={() => {
          openModal('controlled');
        }}
      ></Btn>

      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <h2>{formType === 'uncontrolled' ? 'uncontrolled' : 'controlled'}</h2>
        {formType === 'uncontrolled' && <FormUnControled />}
        {formType === 'controlled' && <FormControlled />}
      </Modal>
    </div>
  );
};
