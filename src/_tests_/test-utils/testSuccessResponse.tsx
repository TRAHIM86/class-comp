import Requests from '../../requests';

export async function testSuccessResponse(
  method: keyof typeof Requests,
  value: string
) {
  window.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ name: 'testNetwork' }),
  } as Response);

  const result = await Requests[method](value, 1);

  expect(result).toEqual({ name: 'testNetwork' });
}
