import Requests from '../../requests';

export async function tetsErrorNetwork(
  method: keyof typeof Requests,
  value: string
) {
  window.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

  const result = await Requests[method](value, 1);

  expect(result).toBeInstanceOf(Error);
  expect(result.message).toBe('Network error');
}
