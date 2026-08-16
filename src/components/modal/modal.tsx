import { createPortal } from 'react-dom';
import type { ModalProps } from '../../types';

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div>
      <div onClick={onClose}>
        <div>
          {children}
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>,
    document.body
  );
};
