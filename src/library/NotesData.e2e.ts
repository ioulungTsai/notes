import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'

import * as notesData from './NotesData'

describe('NotesData Integration Tests', () => {
  const expectedData = JSON.parse(
    `[
      {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note"},
      {"id":"2","datetime":"2022-10-17T10:11Z","title":"My 2nd Note"},
      {"id":"3","datetime":"2022-10-18T10:12Z","title":"My 3rd Note"},
      {"id":"4","datetime":"2022-10-19T10:13Z","title":"My 4th Note"}
    ]`)

  beforeEach(async () => {
    await axios.put('/test/reset')
  })

  afterAll(async () => {
    await axios.put('/test/reset')
  })

  it('should get a Notes List', async () => {
    const data = await notesData.getList()
    expect(data).toEqual(expectedData)
  })

  it('should get a Note', async () => {
    const expectedResults = JSON.parse(`
      {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note","text": "Text for my 1st Note"}
    `)

    // Test we get a note as expected
    const data = await notesData.getNote(1)
    expect(data).toEqual(expectedResults)

    // Test that a bad id returns an error from the server
    try {
      await notesData.getNote(-1)
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data).toBe(-1)
    }
  })
})
