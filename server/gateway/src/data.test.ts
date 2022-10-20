import * as data from './data'

describe('NotesData Tests', () => {
  const expectedData = JSON.parse(
  `[
    {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note"},
    {"id":"2","datetime":"2022-10-17T10:11Z","title":"My 2nd Note"},
    {"id":"3","datetime":"2022-10-18T10:12Z","title":"My 3rd Note"},
    {"id":"4","datetime":"2022-10-19T10:13Z","title":"My 4th Note"}
  ]`)

  test('getList returns expected data',async () => {
    const list = await data.getList()
    expect(list).toEqual(expectedData)
  })

  test('getNote returns expected note', async () => {
    const expectedResults = JSON.parse(`
      {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note","text": "Text for my 1st Note"}
    `)
    const note = await data.getNote(1)
    expect(note).toEqual(expectedResults)
  })

  test('getNote returns empty object if id is invalid', async () => {
    const note = await data.getNote(-1)
    expect(Object.keys(note).length).toBe(0)
  })

  test('saveNote should save a note', async () => {
    const expectedResults = JSON.parse(`
      {"id":"1","datetime":"2022-10-16T10:10Z","title":"Edited Test Title","text": "Edited Test Text"}
    `)

    data.saveNote(1, 'Edited Test Title', 'Edited Test Text')

    const note = await data.getNote(1)
    expect(note).toEqual(expectedResults)
  })

  test('addNote should add a new note', async () => {
    const expectedResults = JSON.parse(`
      {
        "id":"5",
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
    const newNodeId = await data.addNote()
    expect(newNodeId).toBe(5)

    const note = await data.getNote(newNodeId)
    expect(note).toEqual(expectedResults)
  })

  test('deleteNote deletes the right note', async () => {
    await data.deleteNote(2)

    const note = await data.getNote(2)
    expect(Object.keys(note).length).toBe(0)
  })
})
