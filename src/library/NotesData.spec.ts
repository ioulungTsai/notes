import axios from 'axios'
const mock = jest.spyOn(axios, 'get')

import * as notesData from './NotesData'

describe('NotesData Tests', () => {
  const expectedData = JSON.parse(
  `[
    {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note"},
    {"id":"2","datetime":"2022-10-17T10:11Z","title":"My 2nd Note"},
    {"id":"3","datetime":"2022-10-18T10:12Z","title":"My 3rd Note"},
    {"id":"4","datetime":"2022-10-19T10:13Z","title":"My 4th Note"}
  ]`)

  test('getList returns expected data',async () => {
    mock.mockResolvedValue({data: expectedData})
    const data = await notesData.getList()
    expect(data).toEqual(expectedData)
  })

  test('getNote returns expected note', async () => {
    const expectedResults = JSON.parse(`
      {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note","text": "Text for my 1st Note"}
    `)
    mock.mockResolvedValue({data: expectedResults})
    const note = await notesData.getNote(1)
    expect(note).toEqual(expectedResults)
  })

  test('saveNote should save a note', async () => {
    const expectedResults = JSON.parse(`
      {"id":"1","datetime":"2022-10-16T10:10Z","title":"Edited Test Title","text": "Edited Test Text"}
    `)
    const putMock = jest.spyOn(axios, 'put')
    putMock.mockResolvedValue({data: 'save put'})

    notesData.saveNote(1, 'Edited Test Title', 'Edited Test Text')

    mock.mockResolvedValue({data: expectedResults})
    const note = await notesData.getNote(1)
    expect(note).toEqual(expectedResults)
  })

  test('addNote should add a new note', async () => {
    // Mock axios.post
    const postMock = jest.spyOn(axios, 'post')
    postMock.mockResolvedValue({data: '5'})

    // Add note 5 check for results
    const newNodeId = await notesData.addNote()
    expect(newNodeId).toBe(5)
  })

  test('deleteNote deletes the right note', async () => {
    const deleteMock = jest.spyOn(axios, 'delete')
    deleteMock.mockResolvedValue({data: '2'})
    const noteId = await notesData.deleteNote(2)
    expect(noteId).toBe(2)
  })
})
