import { app } from './app'
import request from 'supertest'
import * as testapi from './test-api'
app.use('/test', testapi.router)

describe('Test API Tests', () => {
  it('should reset data', async () => {
    const expectedData = JSON.parse(
      `[
        {"title":"My 1st Note"},
        {"title":"My 2nd Note"},
        {"title":"My 3rd Note"},
        {"title":"My 4th Note"}
      ]`)

    // Make a change
    await request(app).post('/api/note/add')

    // Check data does note match defaults
    let response = await request(app).get('/api/list')
    expect(response.status).toBe(200)
    const list = JSON.parse(response.text)
    expect(list.length).not.toBe(4)

    // Reset the data and check if match defaults
    response = await request(app).put('/test/reset')
    expect(response.text).toBe('RESET DONE')

    // Check if data reset back to defaults
    response = await request(app).get('/api/list')
    expect(response.status).toBe(200)
    const resetList = JSON.parse(response.text)
    expect(resetList.length).toBe(4)

    // Loop through list values to check they match expected results
    for(let i = 0; i < resetList.length; ++i)
      expect(resetList[i].title).toBe(expectedData[i].title)
  })
})
