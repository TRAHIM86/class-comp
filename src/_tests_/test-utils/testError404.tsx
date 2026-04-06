import Requests from '../../requests';

export async function testError404(
  method: keyof typeof Requests,
  value: string | null
) {
  window.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 404,
  } as Response);

  const result = await Requests[method](value);

  expect(result).toEqual({
    isError: true,
    status: 404,
  });
}
