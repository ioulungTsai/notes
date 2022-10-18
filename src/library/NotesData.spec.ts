import * as noteData from './NotesData'

describe('NotesData Tests', () => {
  const expectedData = JSON.parse(
  `[
    {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note"},
    {"id":"2","datetime":"2022-10-17T10:11Z","title":"My 2nd Note"},
    {"id":"3","datetime":"2022-10-18T10:12Z","title":"My 3rd Note"},
    {"id":"4","datetime":"2022-10-19T10:13Z","title":"My 4th Note"}
  ]`)

  test('getList returns expected data',async () => {
    expect(noteData.getList()).toEqual(expectedData)
  })

  test('getNote returns expected note', () => {
    const expectedResults = JSON.parse(`
      {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note","text": "Text for my 1st Note"}
    `)
    expect(noteData.getNote(1)).toEqual(expectedResults)
  })

  test('saveNote should save a note', () => {
    const expectedResults = JSON.parse(`
      {"id":"1","datetime":"2022-10-16T10:10Z","title":"Edited Test Title","text": "Edited Test Text"}
    `)
    noteData.saveNote(1, 'Edited Test Title', 'Edited Test Text')
    expect(noteData.getNote(1)).toEqual(expectedResults)
  })

  test('addNote should add a new note', () => {
    const expectedResults = JSON.parse(`
      {
        "id":5,
        "datetime":"2022-11-22T11:22:00.000Z",
        "title":"untitled",
        "text":""
      }
    `)

    // Mock Date.now() to return a fixed testable date-time
    jest.spyOn(global.Date, 'now')
    .mockImplementationOnce(() =>
      new Date('2022-11-22T11:22Z').valueOf()
    )

    // Add note 5 check for results
    noteData.addNote()
    expect(noteData.getNote(5)).toEqual(expectedResults)
  })
})
