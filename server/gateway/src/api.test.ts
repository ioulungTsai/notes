import { app } from './app'
import request from 'supertest'

// Mock Date.now to return testable time
jest.spyOn(global.Date, 'now').mockImplementation(
  () => new Date("2022-10-19T10:00:22.246Z").valueOf()
)

describe('gateway API tests', () => {
  it('should get the notes list', async () => {
    const expectedData = JSON.parse(
      `[
        {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note"},
        {"id":"2","datetime":"2022-10-17T10:11Z","title":"My 2nd Note"},
        {"id":"3","datetime":"2022-10-18T10:12Z","title":"My 3rd Note"},
        {"id":"4","datetime":"2022-10-19T10:13Z","title":"My 4th Note"}
      ]`)
    const response = await request(app).get('/api/list')
    expect(response.status).toBe(200)
    expect(response.text).toBe(JSON.stringify(expectedData))
  })

  it('should get a note', async () => {
    const expectedResults = JSON.parse(`
    {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note","text": "Text for my 1st Note"}
    `)
    const response = await request(app).get('/api/note/1')
    expect(response.status).toBe(200)
    expect(response.text).toBe(JSON.stringify(expectedResults))
  })

  it('should get an error if the note not exist', async () => {
    const response = await request(app).get('/api/note/-1')
    expect(response.status).toBe(404)
    expect(response.text).toBe("-1")
  })

  it('should add a new note', async () => {
    let response = await request(app).post('/api/note/add')
    expect(response.status).toBe(201)
    expect(response.text).toBe("5")

    // Get the new note to check its content
    response = await request(app).get('/api/note/5')
    expect(response.status).toBe(200)

    const expectedResults = JSON.parse(`
      {"id":"5","datetime":"2022-10-19T10:00:22.246Z","title":"untitled","text":""}
    `)
    expect(response.text).toBe(JSON.stringify(expectedResults))
  })

  it('should save a note', async () => {
    const response = await request(app).put('/api/note/save/2')
    expect(response.status).toBe(200)
    expect(response.text).toBe('save note:2')
  })


  it('should delete a note', async () => {
    const response = await request(app).delete('/api/note/1')
    expect(response.status).toBe(200)
    expect(response.text).toBe("1")
  })

  it('should error out if note id is not valid', async () => {
    const response = await request(app).delete('/api/note/-1')
    expect(response.status).toBe(404)
    expect(response.text).toBe("-1")
  })

})
