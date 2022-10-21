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
    const note = await data.getNote("1")
    expect(note).toEqual(expectedResults)
  })

  test('getNote throws error if id is invalid', async () => {
    expect(() => data.getNote("-1")).toThrowError()
  })

  test('saveNote should save a note', async () => {
    const expectedResults = JSON.parse(`
      {"id":"1","datetime":"2022-10-16T10:10Z","title":"Edited Test Title","text": "Edited Test Text"}
    `)

    data.saveNote("1", 'Edited Test Title', 'Edited Test Text')

    const note = await data.getNote("1")
    expect(note).toEqual(expectedResults)
  })

  test('saveNote throws error if id is invalid', async () => {
    expect(() => data.saveNote("-1", 'Edited Test Title', 'Edited Test Text')).toThrowError()
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
    expect(newNodeId).toBe("5")

    const note = await data.getNote(newNodeId.toString())
    expect(note).toEqual(expectedResults)
  })

  test('deleteNote deletes the right note', async () => {
    const deletedId = await data.deleteNote("2")
    expect(deletedId).toBe("2")
    expect(() => data.getNote("2")).toThrowError()
  })

  test('if reset sets data back to defaults', () => {
    // Change the data
    const id = data.addNote()

    //Check that data is not as expected
    const list = data.getList()
    expect(list).not.toEqual(expectedData)
    expect(id).not.toEqual('5')

    // Reset data and check it matches defults
    data.reset()
    const resetList = data.getList()
    expect(resetList).toEqual(expectedData)
    const restId = data.addNote()
    expect(restId).toEqual('5')
  })
})
