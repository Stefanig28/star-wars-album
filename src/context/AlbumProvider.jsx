import { useReducer } from 'react';
import { AlbumContext } from './albumContext';
import { albumReducer } from './albumReducer';
import { fetchResourceById } from '../api/swapi';
import { getRandomResourceId } from '../utils/stickerUtils';

const COOLDOWN_DURATION = 60;
const MAX_ENVELOPES = 4;

const initialEnvelopes = Array.from({ length: MAX_ENVELOPES }, (_, i) => ({
  id: i + 1,
  stickers: [],
  lastOpened: null,
}));

const initialState = {
  envelopes: initialEnvelopes,
  cooldown: 0,
  isCooldownActive: false,
};

export const AlbumProvider = ({ children }) => {
  const [state, dispatch] = useReducer(albumReducer, initialState);

  const openEnvelope = async (envelopeId) => {
    const stickers = await Promise.all(
      Array.from({ length: 3 }, async () => {
        const randomId = getRandomResourceId('people');
        return await fetchResourceById('people', randomId);
      })
    );

    dispatch({
      type: 'ADD_STICKER',
      payload: { id: envelopeId, stickers, lastOpened: new Date() },
    });

    dispatch({ type: 'SET_COOLDOWN', payload: COOLDOWN_DURATION });

    setTimeout(() => {
      dispatch({ type: 'RESET_COOLDOWN' });
    }, COOLDOWN_DURATION * 1000);
  };

  return (
    <AlbumContext.Provider value={{ state, openEnvelope }}>
      {children}
    </AlbumContext.Provider>
  );
};
