import styles from './columnTitle.module.scss';

interface ColumnProps {
  id: string;
  size: number; 
  onClick?: () => void;
  children: string;
}

export const ColumnTitle: React.FC<ColumnProps> = ({ id, size, onClick, children }) => {
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