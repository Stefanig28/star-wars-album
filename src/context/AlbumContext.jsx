import React, { createContext, useReducer } from 'react';
import { fetchResourceById } from '../api/swapi';
import { generateRandomStickersConfig } from '../utils/stickerUtils';

const COOLDOWN_DURATION = 60;
const MAX_ENVELOPES = 4;

const initialEnvelopes = Array.from({ length: MAX_ENVELOPES }, (_, id) => ({
  id: id,
  lockedUntil: 0,
  status: 'available',
}));

const initialState = {
  album: { movies: {}, characters: {}, starships: {} },
  envelopes: initialEnvelopes,
  lastOpenedStickers: null,
};

export const AlbumContext = createContext(initialState);

const albumReducer = (state, action) => {
  switch (action.type) {
    case 'LOCK_ENVELOPES': {
      const lockTime = Date.now() + COOLDOWN_DURATION * 1000;
      return {
        ...state,
        envelopes: state.envelopes.map((envelope) => {
          if (envelope.id !== action.payload.openedEnvelopeId) {
            return { ...envelope, lockedUntil: lockTime, status: 'locked' };
          }
          return { ...envelope, status: 'cooldown' };
        }),
      };
    }
    case 'SET_LAST_OPENED_STICKERS':
      return {
        ...state,
        lastOpenedStickers: action.payload.stickers,
      };
    case 'ADD_STICKER': {
      const { sticker } = action.payload;
      return {
        ...state,
        album: {
          ...state.album,
          [sticker.resourceKey]: {
            ...state.album[sticker.resourceKey],
            [sticker.id]: sticker,
          },
        },
      };
    }
    case 'DISCARD_ENVELOPE':
      return {
        ...state,
        lastOpenedStickers: null,
        envelopes: state.envelopes.map((e) =>
          e.id === action.payload.openedEnvelopeId
            ? { ...e, status: 'available' }
            : e
        ),
      };
    case 'UPDATE_COOLDOWNS': {
      const now = Date.now();
      return {
        ...state,
        envelopes: state.envelopes.map((envelope) => {
          if (envelope.status === 'locked' && now >= envelope.lockedUntil) {
            return { ...envelope, lockedUntil: 0, status: 'available' };
          }
          return envelope;
        }),
      };
    }
    default:
      return state;
  }
};

export const AlbumProvider = ({ children }) => {
  const [state, dispatch] = useReducer(albumReducer, initialState);

  const openEnvelope = async (envelopeId) => {
    const envelope = state.envelopes.find((e) => e.id === envelopeId);
    if (!envelope || envelope.status !== 'available') return;

    dispatch({
      type: 'LOCK_ENVELOPES',
      payload: { openedEnvelopeId: envelopeId },
    });
    const stickerRequests = generateRandomStickersConfig();
    const fetchedStickers = await Promise.all(
      stickerRequests.map(({ resourceKey, id }) =>
        fetchResourceById(resourceKey, id)
      )
    );

    const processedStickers = fetchedStickers.map((sticker) => {
      const isNew = !state.album[sticker.resourceKey][sticker.id];
      return { ...sticker, isNew };
    });

    dispatch({
      type: 'SET_LAST_OPENED_STICKERS',
      payload: { stickers: processedStickers },
    });
  };

  const addSticker = (sticker) => {
    dispatch({ type: 'ADD_STICKER', payload: { sticker } });
  };

  const discardEnvelope = (openedEnvelopeId) => {
    dispatch({ type: 'DISCARD_ENVELOPE', payload: { openedEnvelopeId } });
  };

  const checkCooldowns = () => {
    dispatch({ type: 'UPDATE_COOLDOWNS' });
  };

  return (
    <AlbumContext.Provider
      value={{
        state,
        openEnvelope,
        addSticker,
        discardEnvelope,
        checkCooldowns,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};
