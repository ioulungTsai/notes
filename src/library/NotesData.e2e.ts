import axios from 'axios'
import app from '../global/app.dev'
app()

import * as notesData from './NotesData'

describe('NotesData Integration Tests', () => {
  const expectedData = JSON.parse(
    `[
      {"title":"My 1st Note"},
      {"title":"My 2nd Note"},
      {"title":"My 3rd Note"},
      {"title":"My 4th Note"}
    ]`)

  beforeEach(async () => {
    await axios.put('/test/reset')
  })

  afterAll(async () => {
    await axios.put('/test/reset')
  })

  it('should get a Notes List', async () => {
    const list = await notesData.getList()
    expect(list.length).toBe(4)
    for(let i = 0; i < list.length; ++i)
      expect(list[i].title).toEqual(expectedData[i].title)
  })

  it('should get a Note or get an error', async () => {
    const expectedResults = JSON.parse(`
      {"title":"My 1st Note","text": "Text for my 1st Note"}
    `)

    // Get note id from the notes list
    const list = await notesData.getList()
    const noteId = list[0].id

    // Test we get a note as expected
    const note = await notesData.getNote(noteId)
    expect(note.id).toBe(noteId)
    expect(note.datetime).toBe(list[0].datetime)
    expect(note.title).toBe(expectedResults.title)
    expect(note.text).toBe(expectedResults.text)

    // Test that a bad id returns an error from the server
    try {
      await notesData.getNote('-1')
      fail('getNote did not rturn an error')
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data).toBe(-1)
    }
  })

  it('should add a note', async () => {
    // Create note and check id
    const noteId = await notesData.addNote()

    // Fetch note to make sure it was created
    const note = await notesData.getNote(noteId)
    expect(note.id).toBe(noteId)
    expect(note.text).toBe('')
    expect(note.title).toBe('untitled')
  })

  it('should delete a note or get an error', async () => {
    // Get note id from the notes list
    const list = await notesData.getList()
    const noteId = list[0].id

    // delete note and check returned id
    const deletedId = await notesData.deleteNote(noteId)
    expect(deletedId).toBe(noteId)

    // fetch note #2 to prove it does note exist
    try {
      await notesData.getNote("2")
      fail('getNote did not rturn an error')
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data).toBe(2)
    }

    // delete note that does not exist
    try {
      await notesData.deleteNote('2')
      fail('deleteNote did not rturn an error')
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data).toBe(2)
    }
  })

  it('should save a note or get an error', async () => {
    // Get note id from the notes list
    const list = await notesData.getList()
    const noteId = list[0].id

    // save note and check returned id
    const savedId = await notesData.saveNote(noteId, 'Edited Test Title', 'Edited Test Text')
    expect(savedId).toBe(noteId)

    // fetch saved note and check its content
    const note = await notesData.getNote(noteId)
    expect(note.title).toBe('Edited Test Title')
    expect(note.text).toBe('Edited Test Text')

    // Test that a bad id returns an error from the server
    try {
      await notesData.saveNote('-1', 'Edited Test Title', 'Edited Test Text')
      fail('saveNote did not rturn an error')
    } catch (error) {
      expect(error.response.status).toBe(404)
      expect(error.response.data).toBe(-1)
    }
  })

})
