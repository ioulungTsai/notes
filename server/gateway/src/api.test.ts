import { app } from './app'
import request from 'supertest'

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
    const response = await request(app).get('/api/note/3')
    expect(response.status).toBe(200)
    expect(response.text).toBe('note:3')
  })

  it('should add a new note', async () => {
    const response = await request(app).post('/api/note/add')
    expect(response.status).toBe(201)
    expect(response.text).toBe('add new note')
  })

  it('should save a note', async () => {
    const response = await request(app).put('/api/note/save/2')
    expect(response.status).toBe(200)
    expect(response.text).toBe('save note:2')
  })


  it('should delete a note', async () => {
    const response = await request(app).delete('/api/note/1')
    expect(response.status).toBe(200)
    expect(response.text).toBe('delete note:1')
  })

})
