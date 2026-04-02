import {add} from '../src/utils/math';

describe('add utility function (unit test)', () => {
  it('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(6);
  });

  it('handles negative values', () => {
    expect(add(-4, 10)).toBe(6);
  });
});
