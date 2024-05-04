import { ReactNode } from "react";
import styles from './linkButton.module.scss';

interface LinkProps {
  href: string;
  variant: 'primary' | 'secondary';
  children: ReactNode
}

interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: ReactNode;
}

export const LinkButton = ({ href, variant, children }: LinkProps) => {
  const selectedVariant = variant === 'primary' ? styles.primary : styles.secondary

  return (
    <a className={selectedVariant} href={href}>{children}</a>
  )
}

export const SubmitButton = ({ variant, children }: ButtonProps) => {
  const selectedVariant = variant === 'primary' ? styles.primary : styles.secondary

  return (
    <button className={`${selectedVariant} ${styles.button}`} type="submit">{children}</button>
  )
}