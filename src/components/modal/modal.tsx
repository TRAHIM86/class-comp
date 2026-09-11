import { createPortal } from 'react-dom';
import type { ModalProps } from '../../types';
import { modalOverlay, modalBox } from '../../styles/styles';
import { Btn } from '../../ui/btn';
import { useEffect } from 'react';

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    // функция закрыть модалку при клике 'Escape'
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // слушатель на клик
    document.addEventListener('keydown', handleEsc);

    // отписка от слушателя при закрытии модалки
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  });

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
