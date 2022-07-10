import React, { createContext, useContext, useEffect, useState } from 'react';

export type Snip = {
  id: string;
  name: string;
  code: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
};

type SnipsContext = {
  snips: Snip[];
  snipsLoading: boolean;
  addSnip?: (snip: Snip) => void;
  removeSnip?: (id: string) => void;
  updateSnip?: (snip: Snip) => void;
};

const snipsContext = createContext<SnipsContext>({
  snips: [],
  snipsLoading: false,
});

export const useSnips = () => {
  const context = useContext(snipsContext);
  if (!context) {
    throw new Error('useSnips must be used within a SnipsProvider');
  }

  return context;
};

type SnipsProviderProps = {
  children?: React.ReactNode;
};

export function SnipsProvider({ children }: SnipsProviderProps) {
  const [snips, setSnips] = useState<Snip[]>(() => []);
  const [snipsLoading, setLoadingSnips] = useState(true);

  function getSnips() {
    setLoadingSnips(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const snipsFromLocalStorage = localStorage.getItem('snips');
        let s: Snip[] = [];
        if (snipsFromLocalStorage) {
          s = JSON.parse(snipsFromLocalStorage);
        }

        setSnips(s);
        resolve(s);
        setLoadingSnips(false);
      }, 1000);
    });
  }

  useEffect(() => {
    getSnips();
  }, []);

  function saveSnipsToLocalStorage(snips: Snip[]) {
    localStorage.setItem('snips', JSON.stringify(snips));
  }

  function addSnip(newSnip: Snip) {
    const newSnips = [...snips, newSnip];
    setSnips(newSnips);
    saveSnipsToLocalStorage(newSnips);
    getSnips();
  }

  function removeSnip(snipId: string) {
    const newSnips = snips.filter((snip) => snip.id !== snipId);
    setSnips(newSnips);
    saveSnipsToLocalStorage(newSnips);
    getSnips();
  }

  function updateSnip(snip: Snip) {
    const newSnips = snips.map((s) => (s.id === snip.id ? snip : s));
    setSnips(newSnips);
    saveSnipsToLocalStorage(newSnips);
    getSnips();
  }

  return (
    <snipsContext.Provider
      value={{ snips, addSnip, updateSnip, removeSnip, snipsLoading }}>
      {children}
    </snipsContext.Provider>
  );
}
