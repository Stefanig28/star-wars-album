import { ResourceMap } from '../api/swapi';

export const getStickerCategory = (resourceKey, id) => {
  const { specialCount } = ResourceMap[resourceKey];
  return id <= specialCount ? 'Especial' : 'Regular';
};

export const getRandomResourceId = (resourceKey) => {
  const { total } = ResourceMap[resourceKey];
  return Math.floor(Math.random() * total) + 1;
};

export const generateRandomStickersConfig = () => {
  const isConfig1 = Math.random() < 0.5; 
  const stickerKeys = [];

  if (isConfig1) {
    stickerKeys.push('movies');
    for (let i = 0; i < 3; i++) stickerKeys.push('characters');
    stickerKeys.push('starships');
  } else {
    for (let i = 0; i < 3; i++) stickerKeys.push('characters');
    for (let i = 0; i < 2; i++) stickerKeys.push('starships');
  }

  return stickerKeys.map(key => ({
    resourceKey: key, 
    id: getRandomResourceId(key),
  }));
};
