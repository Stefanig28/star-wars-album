import { useContext } from 'react';
import { AlbumContext } from '../context/AlbumContext';

/**
 * Custom hook to access the album state and actions.
 * @returns {object} { state, openEnvelope, addSticker, discardEnvelope, checkCooldowns }
 */
export const useAlbum = () => {
  const context = useContext(AlbumContext);
  if (context === undefined) {
    throw new Error('useAlbum debe usarse dentro de un AlbumProvider');
  }
  return context;
};
