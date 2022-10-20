import * as Utils from "./Utils"

describe('Utils tests', () => {
  test('getDateTime returns expected date', () => {
     // Mock Date.now() to return a fixed testable date-time
     jest.spyOn(global.Date, 'now')
     .mockImplementationOnce(() =>
       new Date('2022-11-22T11:22Z').valueOf()
     )

     expect(Utils.getDateTime()).toBe('2022-11-22T11:22:00.000Z')
  })

  test('arrToObj converts array to object', () => {
    const arr = [
      {id:'1', content:'a'},
      {id:'2', content:'b'},
      {id:'3', content:'c'}
    ]

    const result = Utils.arrToObj(arr, 'id')
    expect(result).toEqual(
      JSON.parse(`
        {
          "1":{"id":"1","content":"a"},
          "2":{"id":"2","content":"b"},
          "3":{"id":"3","content":"c"}
        }
      `)
    )
  })
})
