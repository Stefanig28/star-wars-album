import axios from 'axios';
import { getStickerCategory } from '../utils/stickerUtils';

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

/**
 * Fetch a resource by its type and ID.
 *
 * @param {string} resourceKey - 'movies', 'characters', or 'starships'
 * @param {number} id - The ID of the resource to fetch
 */
export const fetchResourceById = async (resourceKey, id) => {
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
    console.warn(
      `[SWAPI Error] Failed to fetch ${resourceKey} with ID ${id}.`,
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
