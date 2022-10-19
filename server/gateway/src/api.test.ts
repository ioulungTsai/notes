import { app } from './app'
import request from 'supertest'

describe('gateway API tests', () => {
  it('should get the notes list', async () => {
    const response = await request(app).get('/api/list')
    expect(response.status).toBe(200)
    expect(response.text).toBe('list')
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
