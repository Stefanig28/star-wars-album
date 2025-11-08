import { useReducer } from 'react';
import { AlbumContext } from './albumContext';
import { albumReducer } from './albumReducer';
import { fetchResourceById } from '../api/swapi';
import { generateRandomStickersConfig } from '../utils/stickerUtils'; 

const COOLDOWN_DURATION = 60;
const MAX_ENVELOPES = 4;

const initialEnvelopes = Array.from({ length: MAX_ENVELOPES }, (_, i) => ({
  id: i + 1,
  stickers: [],
  lastOpened: null,
}));

const initialState = {
  album: { 
    movies: {}, 
    characters: {}, 
    starships: {},
    lastOpenedStickers: null, 
  },
  envelopes: initialEnvelopes,
  cooldown: 0,
  isCooldownActive: false,
};

export const AlbumProvider = ({ children }) => {
  const [state, dispatch] = useReducer(albumReducer, initialState);

  const openEnvelope = async (envelopeId) => {
    if (state.isCooldownActive) return;

    const stickerConfigs = generateRandomStickersConfig();
    
    const apiPromises = stickerConfigs.map(({ resourceKey, id }) => 
        fetchResourceById(resourceKey, id)
    );
    
    const results = await Promise.all(apiPromises);
    const stickers = results.filter(res => !res.error); 

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
    <AlbumContext.Provider value={{ state, openEnvelope, dispatch }}>
      {children}
    </AlbumContext.Provider>
  );
};