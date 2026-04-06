import Requests from '../../requests';

export async function tetsErrorNetwork(
  method: keyof typeof Requests,
  value: string | null
) {
  window.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

  const result = await Requests[method](value);

  expect(result).toBeInstanceOf(Error);
  expect(result.message).toBe('Network error');
}
