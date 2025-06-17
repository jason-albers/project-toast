import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ toastList, setToastList }) {
  function handleDismiss(id) {
    const indexToDismiss = toastList.findIndex(
      (item) => item.id === id
    );
    const newToastList = [...toastList];
    newToastList.splice(indexToDismiss, 1);
    setToastList(newToastList);
  }

  return (
    <ol className={styles.wrapper}>
      {toastList.map((toast) => (
        <li className={styles.toastWrapper} key={toast.id}>
          <Toast
            variant={toast.variant}
            handleDismiss={handleDismiss}
            id={toast.id}
          >
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
