import {
  getRandomResourceId,
  getStickerCategory,
  generateRandomStickersConfig,
} from '../../utils/stickerUtils';
import { ResourceMap } from '../../api/swapi';

describe('Sticker Utilities Tests', () => {
  describe('getStickerCategory', () => {
    it("should classify IDs within the specialCount range as 'Special'", () => {
      expect(getStickerCategory('characters', 20)).toBe('Special');
    });

    it("should classify IDs outside the specialCount range as 'Regular'", () => {
      expect(getStickerCategory('characters', 21)).toBe('Regular');
    });
  });

  describe('getRandomResourceId', () => {
    it('should return an ID within the [1, total] range for Characters (1–82)', () => {
      const total = ResourceMap['characters'].total;
      for (let i = 0; i < 100; i++) {
        const id = getRandomResourceId('characters');
        expect(id).toBeGreaterThanOrEqual(1);
        expect(id).toBeLessThanOrEqual(total);
        expect(Number.isInteger(id)).toBe(true);
      }
    });
  });

  describe('generateRandomStickersConfig', () => {
    it('should always generate exactly 5 stickers in total', () => {
      const config = generateRandomStickersConfig();
      expect(config.length).toBe(5);
    });

    it('should follow valid resource mix configurations (1M/3C/1S or 0M/3C/2S)', () => {
      for (let i = 0; i < 20; i++) {
        const config = generateRandomStickersConfig();
        const keys = config.map((item) => item.resourceKey);

        const movies = keys.filter((k) => k === 'movies').length;
        const characters = keys.filter((k) => k === 'characters').length;
        const starships = keys.filter((k) => k === 'starships').length;

        const isConfig1 = movies === 1 && characters === 3 && starships === 1;
        const isConfig2 = movies === 0 && characters === 3 && starships === 2;

        expect(isConfig1 || isConfig2).toBe(true);
      }
    });
  });
});
