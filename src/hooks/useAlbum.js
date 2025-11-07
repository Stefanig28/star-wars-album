import { useContext } from 'react';
import { AlbumProvider } from '../context/AlbumProvider';

/**
 * Custom hook to access the album state and actions.
 * @returns {object} { state, openEnvelope, addSticker, discardEnvelope, checkCooldowns }
 */
export const useAlbum = () => {
  const context = useContext(AlbumProvider);
  if (context === undefined) {
    throw new Error('useAlbum debe usarse dentro de un AlbumProvider');
  }
  return context;
};
