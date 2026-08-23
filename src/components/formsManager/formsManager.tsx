import { useState } from 'react';
import { Btn } from '../../ui/btn';
import { Modal } from '../modal/modal';
import { FormUnControled } from '../formUnControlled/formUnControlled';
import { FormControlled } from '../formControlled/formControlled';

export const FormManager = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [formType, setFormType] = useState<
    'uncontrolled' | 'controlled' | null
  >(null);

  function openModal(typeForm: 'uncontrolled' | 'controlled') {
    setFormType(typeForm);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setFormType(null);
  }

  return (
    <div>
      <Btn
        btnText="OPEN UNCONTROLLED FORM"
        onClickFunc={() => {
          openModal('uncontrolled');
        }}
      ></Btn>

      <Btn
        btnText="OPEN CONTROLLED FORM"
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
