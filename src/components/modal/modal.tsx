import { createPortal } from 'react-dom';
import type { ModalProps } from '../../types';
import { modalOverlay, modalBox } from '../../styles/styles';
import { Btn } from '../../ui/btn';
import { useEffect } from 'react';

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  });

  if (!isOpen) return null;

  return createPortal(
    <div className={modalOverlay} onClick={onClose}>
      <div className={modalBox} onClick={(e) => e.stopPropagation()}>
        <input type="text" placeholder="Имя" autoFocus />
        <input type="email" placeholder="Email" />

        {children}

        <Btn btnText="CLOSE" onClickFunc={onClose}></Btn>
      </div>
    </div>,
    document.body
  );
};
