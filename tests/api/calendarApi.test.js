import calendarApi from '../../src/api/calendarApi'

describe('test on calendarApi', () => {
  test('should have default configuration', () => {
    // eslint-disable-next-line no-undef
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
  })

  test('should have x-token as a header on all requests', async () => {
    const token = 'ABC-123-XYZ'

    localStorage.setItem('token', token)

    const res = await calendarApi.get('/auth')

    expect(res.config.headers['x-token']).toBe(token)
  })
})
