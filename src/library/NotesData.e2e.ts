import axios from 'axios'
import app from '../global/app.dev'
app()

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

  it('should get a Note or get an error', async () => {
    const expectedResults = JSON.parse(`
      {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note","text": "Text for my 1st Note"}
    `)

    // Test we get a note as expected
    const data = await notesData.getNote(1)
    expect(data).toEqual(expectedResults)

    // Test that a bad id returns an error from the server
    try {
      await notesData.getNote(-1)
      fail('getNote did not rturn an error')
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data).toBe(-1)
    }
  })

  it('should add a note', async () => {
    // Create note and check id
    const noteId = await notesData.addNote()
    expect(noteId).toBe(5)

    // Fetch note to make sure it was created
    const note = await notesData.getNote(5)
    expect(note.id).toBe(noteId.toString())
    expect(note.text).toBe('')
    expect(note.title).toBe('untitled')
  })

  it('should delete a note or get an error', async () => {
    // delete note and check returned id
    const noteId = await notesData.deleteNote(2)
    expect(noteId).toBe(2)

    // fetch note #2 to prove it does note exist
    try {
      await notesData.getNote(2)
      fail('getNote did not rturn an error')
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data).toBe(2)
    }

    // delete note that does not exist
    try {
      await notesData.deleteNote(2)
      fail('deleteNote did not rturn an error')
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data).toBe(2)
    }
  })

  it('should save a note or get an error', async () => {
    const noteId = await notesData.saveNote(1, 'Edited Test Title', 'Edited Test Text')
    expect(noteId).toBe(1)

    // Test we get a note as expected
    const note = await notesData.getNote(1)
    expect(note.title).toBe('Edited Test Title')
    expect(note.text).toBe('Edited Test Text')

    // Test that a bad id returns an error from the server
    try {
      await notesData.saveNote(-1, 'Edited Test Title', 'Edited Test Text')
      fail('saveNote did not rturn an error')
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data).toBe(-1)
    }
  })

})
