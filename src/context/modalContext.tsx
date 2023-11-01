import {createContext, useState} from 'react';

export const modalContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>(
  {} as {
    open: boolean;
    setOpen: (open: boolean) => void;
  },
);

export const ModalProvider = ({children}: any) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <modalContext.Provider value={{open, setOpen}}>
      {children}
    </modalContext.Provider>
  );
};
