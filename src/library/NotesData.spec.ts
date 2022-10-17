import * as noteData from './NotesData'

describe('NotesData Tests', () => {
  const expectedData = JSON.parse(
  `[
    {"id":"1","datetime":"2022-10-16T10:10Z","title":"1st Note"},
    {"id":"2","datetime":"2022-10-17T10:11Z","title":"2nd Note"},
    {"id":"3","datetime":"2022-10-18T10:12Z","title":"3rd Note"},
    {"id":"4","datetime":"2022-10-19T10:13Z","title":"4th Note"}
  ]`)

  test('getList returns expected data',async () => {
    expect(noteData.getList()).toEqual(expectedData)
  })

  test('getNote returns expected note', () => {
    const expectedResults = JSON.parse(`
      {"id":"1","datetime":"2022-10-16T10:10Z","title":"1st Note"}
    `)
    expect(noteData.getNote(1)).toEqual(expectedResults)
  })
})
