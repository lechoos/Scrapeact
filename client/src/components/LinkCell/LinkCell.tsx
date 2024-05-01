import styles from './linkCell.module.scss';

interface LinkProps {
  link: string;
  size: number;
}

export const LinkCell: React.FC<LinkProps> = ({ link, size }) => {
  return (
    <td width={size} className={styles['link-cell__container']}>
      <a className={styles['link-cell']} href={link}>Link</a>
    </td>
  )
} 