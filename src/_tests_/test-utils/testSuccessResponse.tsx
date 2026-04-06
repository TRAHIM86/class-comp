import Requests from '../../requests';

export async function testSuccessResponse(
  method: keyof typeof Requests,
  value: string | null
) {
  window.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ name: 'testNetwork' }),
  } as Response);

  const result = await Requests[method](value);

  expect(result).toEqual({ name: 'testNetwork' });
}
