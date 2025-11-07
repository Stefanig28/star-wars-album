const COOLDOWN_DURATION = 60;

export function albumReducer(state, action) {
  switch (action.type) {
    case 'ADD_STICKER': {
      const updated = state.envelopes.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
      return { ...state, envelopes: updated };
    }
    case 'SET_COOLDOWN':
      return { ...state, cooldown: action.payload, isCooldownActive: true };
    case 'RESET_COOLDOWN':
      return { ...state, cooldown: 0, isCooldownActive: false };
    default:
      return state;
  }
}
