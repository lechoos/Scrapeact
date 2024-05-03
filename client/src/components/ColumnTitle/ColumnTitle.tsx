import { ReactElement } from 'react';
import styles from './columnTitle.module.scss';

interface ColumnProps {
  id: string;
  size: number; 
  onClick?: () => void;
  children: ReactElement;
}

export const ColumnTitle = ({ id, size, onClick, children }: ColumnProps) => {
  const isSaveColumn = id === 'save' ? styles['column-title--save'] : ''

  const click = () => {
    if (onClick) {
      onClick();
    }
  }

  return (
    <th onClick={click} className={`${styles['column-title']} ${isSaveColumn}`} style={{ width: size + 'px' }}>{children}</th>
  )
};