import axios from 'axios';
import { getStickerCategory, getRandomResourceId } from '../utils/stickerUtils';

const BASE_URL = 'https://swapi.dev/api';

export const ResourceMap = {
  movies: { type: 'films', total: 6, specialCount: 6, name: 'Movies' },
  characters: {
    type: 'people',
    total: 82,
    specialCount: 20,
    name: 'Characters',
  },
  starships: {
    type: 'starships',
    total: 36,
    specialCount: 10,
    name: 'Starships',
  },
};

const MAX_RETRIES = 5;

/**
 * Fetch a resource by its type and ID, with automatic retry on 404 errors.
 *
 * @param {string} resourceKey - 'movies', 'characters', or 'starships'
 * @param {number} id - The ID of the resource to fetch
 * @param {number} [retryCount=0] - Contador interno de reintentos
 */
export const fetchResourceById = async (resourceKey, id, retryCount = 0) => {
  const resourceType = ResourceMap[resourceKey]?.type;

  try {
    const url = `${BASE_URL}/${resourceType}/${id}/`;
    const response = await axios.get(url);

    return {
      ...response.data,
      id,
      resourceKey,
      category: getStickerCategory(resourceKey, id),
    };
  } catch (error) {
    if (error.response?.status === 404 && retryCount < MAX_RETRIES) {
      console.warn(
        `[SWAPI Retry] ID ${id} fallido para ${resourceKey}. Reintentando (${retryCount + 1}/${MAX_RETRIES}).`
      );

      const newId = getRandomResourceId(resourceKey);

      return fetchResourceById(resourceKey, newId, retryCount + 1);
    }

    console.error(
      `[SWAPI Error] Fallo crítico al obtener ${resourceKey} después de ${retryCount} reintentos.`,
      error.message
    );

    return {
      error: true,
      message: `Sticker not found! (ID ${id})`,
      id,
      resourceKey,
      category: getStickerCategory(resourceKey, id),
      name: 'Unknown Sticker',
    };
  }
};
