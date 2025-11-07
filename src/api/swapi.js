import axios from 'axios';
import { getStickerCategory } from '../utils/stickerUtils'; 

const BASE_URL = 'https://swapi.dev/api';

export const ResourceMap = {
  movies: { type: 'films', total: 6, specialCount: 6, name: 'Películas' },
  characters: { type: 'people', total: 82, specialCount: 20, name: 'Personajes' },
  starships: { type: 'starships', total: 36, specialCount: 10, name: 'Naves' },
};

/**
 * @param {string} resourceKey - 'movies', 'characters', 'starships'
 * @param {number} id - El ID del recurso a buscar
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
      category: getStickerCategory(resourceKey, id)
    };
  } catch (error) {
    console.warn(`[SWAPI Error] No se pudo obtener ${resourceKey} ID ${id}.`, error.message);
    
    return { 
      error: true, 
      message: `¡Lámina no encontrada! (ID ${id})`,
      id,
      resourceKey,
      category: getStickerCategory(resourceKey, id),
      name: 'Lámina Desconocida'
    };
  }
};
