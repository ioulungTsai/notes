import * as noteData from './NotesData'

describe('NotesData Tests', () => {
  test('getList returns expected data',async () => {
    expect(noteData.getList()).toEqual('Hello~ From the NotesData!')
  })
})
