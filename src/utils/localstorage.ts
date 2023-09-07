import { Score } from '../interfaces/sccore';

export const setLocalStorage = (name: string, items: Score[]): void => {
  localStorage.setItem(name, JSON.stringify(items));
};

export const getLocalStorage = (name: string): Score[] => {
  const data = localStorage.getItem(name);

  if (data) {
    return JSON.parse(data);
  } else {
    localStorage.setItem(name, JSON.stringify([]));
    return [];
  }
};
