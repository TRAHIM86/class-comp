import { createPortal } from 'react-dom';
import type { ModalProps } from '../../types';
import { modalOverlay, modalBox } from '../../styles/styles';

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={modalOverlay} onClick={onClose}>
      <div className={modalBox} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>CLOSE</button>
      </div>
    </div>,
    document.body
  );
};
