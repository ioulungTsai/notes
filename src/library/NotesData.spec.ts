import axios from 'axios'
const getMock = jest.spyOn(axios, 'get')

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
    getMock.mockResolvedValue({data: expectedData})
    const data = await notesData.getList()
    expect(data).toEqual(expectedData)
    expect(getMock).toHaveBeenCalledWith('/api/list')
  })

  test('getNote returns expected note', async () => {
    const expectedResults = JSON.parse(`
      {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note","text": "Text for my 1st Note"}
    `)
    getMock.mockClear()
    getMock.mockResolvedValue({data: expectedResults})
    const note = await notesData.getNote(1)
    expect(note).toEqual(expectedResults)
    expect(getMock).toHaveBeenCalledWith('/api/note/1')
  })

  test('saveNote should save a note', async () => {
    const putMock = jest.spyOn(axios, 'put')
    putMock.mockResolvedValue({data: 1})

    const saveResult = await notesData.saveNote(1, 'Edited Test Title', 'Edited Test Text')
    expect(saveResult).toBe(1)
    expect(putMock).toHaveBeenCalledWith(
      '/api/note/save/1',
      {title: 'Edited Test Title', text: 'Edited Test Text'},
      {'headers': {'Content-Type':'application/json'}}
    )
  })

  test('addNote should add a new note', async () => {
    // Mock axios.post
    const postMock = jest.spyOn(axios, 'post')
    postMock.mockResolvedValue({data: '5'})

    // Add note 5 check for results
    const newNodeId = await notesData.addNote()
    expect(newNodeId).toBe(5)
    expect(postMock).toHaveBeenCalledWith('/api/note/add')
  })

  test('deleteNote deletes the right note', async () => {
    const deleteMock = jest.spyOn(axios, 'delete')
    deleteMock.mockResolvedValue({data: '2'})
    const noteId = await notesData.deleteNote(2)
    expect(noteId).toBe(2)
    expect(deleteMock).toHaveBeenCalledWith('/api/note/2')
  })
})
