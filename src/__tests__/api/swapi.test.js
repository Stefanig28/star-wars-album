import axios from 'axios';
import { fetchResourceById } from '../../api/swapi';

const mockLukeSticker = {
  name: 'Luke Skywalker',
  height: '172',
  films: ['url1', 'url2'],
};

const expectedLukeSticker = {
  name: 'Luke Skywalker',
  height: '172',
  films: ['url1', 'url2'],
  id: 1,
  resourceKey: 'characters',
  category: 'Special',
};

jest.mock('axios');
jest.mock('../../utils/stickerUtils', () => ({
  getStickerCategory: (resourceKey, id) => (id <= 10 ? 'Special' : 'Regular'),
}));

describe('SWAPI API Calls (MOCKED)', () => {
  it('should return the full API object enriched with a category', async () => {
    axios.get.mockResolvedValue({ data: mockLukeSticker });

    const result = await fetchResourceById('characters', 1);

    expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/1/');
    expect(result).toEqual(expectedLukeSticker);
  });

  it('should return a readable error object if the API call fails (e.g., 404)', async () => {
    axios.get.mockRejectedValue(
      new Error('Request failed with status code 404')
    );

    const result = await fetchResourceById('starships', 99);

    expect(result.error).toBe(true);
    expect(result.message).toContain('Sticker not found!');
  });
});
