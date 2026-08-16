import { createPortal } from 'react-dom';
import type { ModalProps } from '../../types';
import { modalOverlay, modalBox } from '../../styles/styles';
import { Btn } from '../../ui/btn';

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={modalOverlay} onClick={onClose}>
      <div className={modalBox} onClick={(e) => e.stopPropagation()}>
        {children}
        <Btn btnText="CLOSE" onClickFunc={onClose}></Btn>
      </div>
    </div>,
    document.body
  );
};
