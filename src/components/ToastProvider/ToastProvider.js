import React from 'react';

export const MessageContext = React.createContext();
export const VariantContext = React.createContext();
export const ToastListContext = React.createContext();
export const Controls = React.createContext();

function ToastProvider({ children }) {
  const [messageInput, setMessageInput] = React.useState('');
  const [variantInput, setVariantInput] = React.useState('notice');
  const [toastList, setToastList] = React.useState([]);

  const messages = { messageInput, setMessageInput };
  const variants = { variantInput, setVariantInput };
  const toastLists = { toastList, setToastList };

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

  function handleDismiss(id) {
    const indexToDismiss = toastList.findIndex(
      (item) => item.id === id
    );
    const newToastList = [...toastList];
    newToastList.splice(indexToDismiss, 1);
    setToastList(newToastList);
  }

  function useEscapeKey(event) {
    if (event.key !== 'Escape') {
      return null;
    }

    for (let toast in toastList) {
      handleDismiss(toast.id);
      setToastList([]);
    }
  }

  return (
    <MessageContext value={messages}>
      <VariantContext value={variants}>
        <ToastListContext value={toastLists}>
          <Controls
            value={{ handleSubmit, handleDismiss, useEscapeKey }}
          >
            {children}
          </Controls>
        </ToastListContext>
      </VariantContext>
    </MessageContext>
  );
}

export default ToastProvider;
