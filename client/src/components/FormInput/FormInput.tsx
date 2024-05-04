import React, { useEffect, useState } from 'react';
import styles from './formInput.module.scss';

interface InputTypes {
  name: string;
  label: string;
  ref: React.Ref<HTMLInputElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  value: unknown
}

export const FormInput = React.forwardRef<HTMLInputElement, InputTypes>(({ name, label, onChange, value }, ref) => {
  const [isActive, setIsActive] = useState(false);

  const activeClass = isActive && styles.active

  useEffect(() => {
    if (value) {
      setIsActive(true);
    } else {
      setIsActive(false)
    }
  }, [value]);

  return (
    <div className={styles['input-group']}>
      {/* Przekazujemy ref do elementu input */}
      <input className={styles.input} type="text" name={name} id={name} ref={ref} onChange={onChange} />
      <label className={`${styles.placeholder} ${activeClass}`} htmlFor={name}>{label}</label>
    </div>
  );
});