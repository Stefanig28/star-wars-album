export const albumReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_STICKER': {
      const { id: envelopeId, stickers, lastOpened } = action.payload;

      let newAlbum = { ...state.album };

      if (!newAlbum.characters) newAlbum.characters = {};
      if (!newAlbum.starships) newAlbum.starships = {};
      if (!newAlbum.movies) newAlbum.movies = {};

      stickers.forEach((sticker) => {
        const resourceKey = sticker.resourceKey || 'characters';

        newAlbum[resourceKey] = {
          ...newAlbum[resourceKey],
          [sticker.id]: sticker,
        };
      });

      const newEnvelopes = state.envelopes.map((e) =>
        e.id === envelopeId ? { ...e, stickers, lastOpened } : e
      );

      return {
        ...state,
        album: newAlbum,
        envelopes: newEnvelopes,
        lastOpenedStickers: stickers,
      };
    }

    case 'ADD_TO_ALBUM_MANUAL': {
      const sticker = action.payload;
      const resourceKey = sticker.resourceKey || 'characters';

      return {
        ...state,
        album: {
          ...state.album,
          [resourceKey]: {
            ...state.album[resourceKey],
            [sticker.id]: sticker,
          },
        },
      };
    }

    case 'DISCARD_FROM_ALBUM': {
      const sticker = action.payload;
      const resourceKey = sticker.resourceKey || 'characters';

      const newResource = { ...state.album[resourceKey] };
      delete newResource[sticker.id];

      return {
        ...state,
        album: {
          ...state.album,
          [resourceKey]: newResource,
        },
      };
    }

    case 'SET_COOLDOWN':
      return {
        ...state,
        cooldown: action.payload,
        isCooldownActive: true,
      };

    case 'RESET_COOLDOWN':
      return {
        ...state,
        cooldown: 0,
        isCooldownActive: false,
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        lastOpenedStickers: null,
      };

    case 'SELECT_STICKER':
      return {
        ...state,
        selectedSticker: action.payload,
      };

    case 'DESELECT_STICKER':
      return {
        ...state,
        selectedSticker: null,
      };

    default:
      return state;
  }
};
