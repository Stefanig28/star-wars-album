import { albumReducer } from '../../context/albumReducer';

describe('albumReducer', () => {
  const initialState = {
    envelopes: [
      { id: 1, name: 'Envelope 1' },
      { id: 2, name: 'Envelope 2' },
    ],
    cooldown: 0,
    isCooldownActive: false,
  };

  it('should return the same state for an unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const result = albumReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('should update the matching envelope when ADD_STICKER is dispatched', () => {
    const updatedEnvelope = { id: 1, name: 'Envelope 1 Updated' };
    const action = { type: 'ADD_STICKER', payload: updatedEnvelope };

    const result = albumReducer(initialState, action);

    expect(result.envelopes[0]).toEqual(updatedEnvelope);
    expect(result.envelopes[1]).toEqual(initialState.envelopes[1]);
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
