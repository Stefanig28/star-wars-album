import { useContext } from 'react';
import { AlbumContext } from '../context/albumContext';
import { ResourceMap } from '../api/swapi';

export const useAlbumChecker = () => {
  const { state } = useContext(AlbumContext);
  const { album } = state;

  /**
   * Verifica si una lámina con un resourceKey y ID específico está en el álbum.
   * @param {string} resourceKey - 'movies', 'characters', or 'starships'
   * @param {number} id - El ID de la lámina (1, 2, 3, etc.)
   * @returns {boolean} - True si está coleccionada.
   */
  const checkIsOwned = (resourceKey, id) => {
    // Aseguramos que la categoría exista en el álbum y luego buscamos el ID.
    return !!album[resourceKey]?.[id];
  };

  /**
   * Devuelve el objeto de la lámina si está coleccionada.
   * @param {string} resourceKey
   * @param {number} id
   * @returns {object | null}
   */
  const getStickerDetails = (resourceKey, id) => {
    return album[resourceKey]?.[id] || null;
  };

  /**
   * Calcula la colección actual y el total por sección.
   */
  const getAlbumProgress = () => {
    const progress = {};

    Object.keys(ResourceMap).forEach((key) => {
      const totalCount = ResourceMap[key].total;
      const collectedCount = Object.keys(album[key] || {}).length;

      progress[key] = {
        collected: collectedCount,
        total: totalCount,
      };
    });

    return progress;
  };

  return {
    checkIsOwned,
    getStickerDetails,
    getAlbumProgress,
    fullAlbum: album,
  };
};
