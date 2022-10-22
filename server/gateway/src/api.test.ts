import { app } from './app'
import request from 'supertest'

// Use test api
import * as testapi from './test-api'
app.use('/test', testapi.router)

// Mock Date.now to return testable time
jest.spyOn(global.Date, 'now').mockImplementation(
  () => new Date("2022-10-19T10:00:22.246Z").valueOf()
)

describe('gateway API tests', () => {
  beforeEach(async () => {await request(app).put('/test/reset')})
  afterAll(async () => {await request(app).put('/test/reset')})

  it('should get the notes list', async () => {
    const expectedData = JSON.parse(
      `[
        {"title":"My 1st Note"},
        {"title":"My 2nd Note"},
        {"title":"My 3rd Note"},
        {"title":"My 4th Note"}
      ]`)

    // issue call to server to get notes list & check return is ok
    const response = await request(app).get('/api/list')
    expect(response.status).toBe(200)

    // extract list
    const list = JSON.parse(response.text)
    expect(list.length).toBe(4)
    for(let i = 0; i < list.length; ++i)
      expect(list[i].title).toEqual(expectedData[i].title)
  })

  it('should get a note', async () => {
    const expectedResults = JSON.parse(`
    {"title":"My 1st Note","text": "Text for my 1st Note"}
    `)

    // get list so we can get an id
    let response = await request(app).get('/api/list')
    const list = JSON.parse(response.text)

    // get note for first list item
    response = await request(app).get(`/api/note/${list[0].id}`)
    expect(response.status).toBe(200)

    // parse the note and check its value
    const note = JSON.parse(response.text)
    expect(note.id).toBe(list[0].id)
    expect(note.datetime).toBe(list[0].datetime)
    expect(note.title).toBe(expectedResults.title)
    expect(note.text).toBe(expectedResults.text)
  })

  it('should get an error if the note not exist', async () => {
    const response = await request(app).get('/api/note/-1')
    expect(response.status).toBe(404)
    expect(response.text).toBe("-1")
  })

  it.skip('should add a new note', async () => {
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

  it.skip('should save a note', async () => {
    // save note
    let response = await request(app)
      .put('/api/note/save/2')
      .send({title: 'test title', text: 'test text'})

    // check response is ok
    expect(response.status).toBe(200)
    expect(response.text).toBe('2')

    // Get note back
    response = await request(app).get('/api/note/2')
    expect(response.status).toBe(200)

    const expectedResults = JSON.parse(`
      {"id":"2","datetime":"2022-10-17T10:11Z","title":"test title","text":"test text"}
    `)
    expect(response.text).toBe(JSON.stringify(expectedResults))
  })

  it.skip('should get an error if saving note that does not exist', async () => {
    // save note
    const response = await request(app)
    .put('/api/note/save/-1')
    .send({title: 'test title', text: 'test text'})
    expect(response.status).toBe(404)
    expect(response.text).toBe("-1")
  })


  it.skip('should delete a note', async () => {
    const response = await request(app).delete('/api/note/1')
    expect(response.status).toBe(200)
    expect(response.text).toBe("1")
  })

  it.skip('should error out if note id is not valid', async () => {
    const response = await request(app).delete('/api/note/-1')
    expect(response.status).toBe(404)
    expect(response.text).toBe("-1")
  })

})
