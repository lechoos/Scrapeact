import React from "react";
import styles from './cell.module.scss';

interface CellProps {
  size: number;
  children: string
}

export const Cell: React.FC<CellProps> = ({ size, children }) => {
  return (
    <td width={size} className={styles.cell}>{children}</td>
  )
}