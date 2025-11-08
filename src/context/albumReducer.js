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

    default:
      return state;
  }
};
