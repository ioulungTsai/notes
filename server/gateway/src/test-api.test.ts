import { app } from './app'
import request from 'supertest'
import * as testapi from './test-api'
app.use('/test', testapi.router)

describe('Test API Tests', () => {
  it.skip('should reset data', async () => {
    const expectedData = JSON.parse(
      `[
        {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note"},
        {"id":"2","datetime":"2022-10-17T10:11Z","title":"My 2nd Note"},
        {"id":"3","datetime":"2022-10-18T10:12Z","title":"My 3rd Note"},
        {"id":"4","datetime":"2022-10-19T10:13Z","title":"My 4th Note"}
      ]`)

    // Make a change
    await request(app).post('/api/note/add')

    // Check data does note match defaults
    let response = await request(app).get('/api/list')
    expect(response.status).toBe(200)
    expect(response.text).not.toBe(JSON.stringify(expectedData))
    response = await request(app).post('/api/note/add')
    expect(response.status).toBe(201)
    expect(response.text).not.toBe('5')


    // Reset the data and check if match defaults
    response = await request(app).put('/test/reset')
    expect(response.text).toBe('RESET DONE')

    // Check if data reset back to defaults
    response = await request(app).get('/api/list')
    expect(response.status).toBe(200)
    expect(response.text).toBe(JSON.stringify(expectedData))

    // Check note id will be 5
    response = await request(app).post('/api/note/add')
    expect(response.status).toBe(201)
    expect(response.text).toBe('5')
  })
})
