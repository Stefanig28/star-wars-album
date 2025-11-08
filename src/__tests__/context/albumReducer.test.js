import { albumReducer } from '../../context/albumReducer';

describe('albumReducer', () => {
  const initialState = {
    envelopes: [
      { id: 1, name: 'Envelope 1' },
      { id: 2, name: 'Envelope 2' },
    ],
    album: {},
    cooldown: 0,
    isCooldownActive: false,
  };

  it('should return the same state for an unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const result = albumReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('should update the matching envelope and album when ADD_STICKER is dispatched', () => {
    const action = {
      type: 'ADD_STICKER',
      payload: {
        id: 1,
        stickers: [
          { id: 'luke', resourceKey: 'characters', name: 'Luke Skywalker' },
          { id: 'falcon', resourceKey: 'starships', name: 'Millennium Falcon' },
        ],
        lastOpened: Date.now(),
      },
    };

    const result = albumReducer(initialState, action);

    expect(result.envelopes[0].stickers).toEqual(action.payload.stickers);
    expect(result.envelopes[0].lastOpened).toBe(action.payload.lastOpened);
    expect(result.envelopes[1]).toEqual(initialState.envelopes[1]);
    expect(result.album.characters['luke']).toEqual(action.payload.stickers[0]);
    expect(result.album.starships['falcon']).toEqual(
      action.payload.stickers[1]
    );

    expect(result.lastOpenedStickers).toEqual(action.payload.stickers);
  });

  it('should set cooldown and activate flag when SET_COOLDOWN is dispatched', () => {
    const action = { type: 'SET_COOLDOWN', payload: 60 };
    const result = albumReducer(initialState, action);

    expect(result.cooldown).toBe(60);
    expect(result.isCooldownActive).toBe(true);
  });

  it('should reset cooldown and deactivate flag when RESET_COOLDOWN is dispatched', () => {
    const activeState = {
      ...initialState,
      cooldown: 30,
      isCooldownActive: true,
    };
    const action = { type: 'RESET_COOLDOWN' };

    const result = albumReducer(activeState, action);

    expect(result.cooldown).toBe(0);
    expect(result.isCooldownActive).toBe(false);
  });
});
