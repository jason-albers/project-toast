import React from 'react';
import ToastShelf from '../ToastShelf/ToastShelf';
import Button from '../Button';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [messageInput, setMessageInput] = React.useState('');
  const [variantInput, setVariantInput] = React.useState('notice');
  const [toastList, setToastList] = React.useState([]);
  /*
  verifying state is wired up:
  console.log(messageInput);
  console.log(variantInput);
  console.log(toastList);
  */

  function handleSubmit() {
    setToastList([
      ...toastList,
      {
        id: `${
          messageInput.slice(1, 6) +
          Math.random() * 100 +
          variantInput
        }`,
        message: messageInput,
        variant: variantInput,
      },
    ]);
    setMessageInput('');
    setVariantInput('notice');
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf
        variant={variantInput}
        setToastList={setToastList}
        toastList={toastList}
      />
      <form
        className={styles.controlsWrapper}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={messageInput}
              onChange={(event) =>
                setMessageInput(event.target.value)
              }
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          {VARIANT_OPTIONS.map((variant) => (
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
              key={variant}
            >
              <label htmlFor={'variant-' + variant}>
                <input
                  id={'variant-' + variant}
                  type="radio"
                  name="variant"
                  value={variant}
                  checked={variantInput === variant}
                  onChange={(event) =>
                    setVariantInput(event.target.value)
                  }
                />
                {variant}
              </label>
            </div>
          ))}
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
