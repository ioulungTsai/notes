import { newSpecPage } from '@stencil/core/testing';

let getNotesListCount = 0
const data = JSON.parse(
  `[
    {
      "datatest":"note1",
      "id":"1","datetime":"2022-10-16T10:10Z","title":"1st Note"
    },
    {
      "datatest":"note2",
      "id":"2","datetime":"2022-10-17T10:11Z","title":"2nd Note"
    },
    {
      "datatest":"note3",
      "id":"3","datetime":"2022-10-18T10:12Z","title":"3rd Note"
    },
    {
      "datatest":"note4",
      "id":"4","datetime":"2022-10-19T10:13Z","title":"4th Note"
    }
  ]`)

jest.mock('../../../library/NotesData', () => ({
  getList: async () => {
    ++getNotesListCount
    return data
  }
}))
import { FskNotesList } from '../fsk-notes-list';

describe('fsk-notes-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FskNotesList],
      html: `<fsk-notes-list></fsk-notes-list>`,
    });
    expect(page.root).toEqualHtml(`
      <fsk-notes-list>
        <mock:shadow-root>
          <div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date/Time</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                <tr data-test="note1">
                  <td>1</td>
                  <td>October 19, 2022 3:13 AM</td>
                  <td>4th Note</td>
                </tr>
                <tr data-test="note2">
                  <td>2</td>
                  <td>October 18, 2022 3:12 AM</td>
                  <td>3rd Note</td>
                </tr>
                <tr data-test="note3">
                  <td>3</td>
                  <td>October 17, 2022 3:11 AM</td>
                  <td>2nd Note</td>
                </tr>
                <tr data-test="note4">
                  <td>4</td>
                  <td>October 16, 2022 3:10 AM</td>
                  <td>1st Note</td>
                </tr>
              </tbody>
            </table>
          </div>
        </mock:shadow-root>
      </fsk-notes-list>
    `);
  });

  it('should handle row click', async () => {
    const page = await newSpecPage({
      components: [FskNotesList],
      html: `<fsk-notes-list></fsk-notes-list>`,
    });

    const row : HTMLElement = (page.root.shadowRoot.querySelector('[data-test="note1"]'))
    const spy = jest.fn()
    page.win.addEventListener('selectedNote', spy)
    row.click()
    await page.waitForChanges()

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0].detail)
    .toStrictEqual({datatest:'note1',noteid:'1'})

  })

  it('should fetch notes list if closeNote event is received',async () => {
    const page = await newSpecPage({
      components: [FskNotesList],
      html: `<fsk-notes-list></fsk-notes-list>`,
    });

    const countBefore = getNotesListCount
    const body : HTMLBodyElement = page.doc.querySelector('body')
    const closeNoteEvent = new CustomEvent('closeNote')
    body.dispatchEvent(closeNoteEvent)
    await page.waitForChanges()

    expect(getNotesListCount).toBe(countBefore + 1)
  })

  it('should fetch notes list if saveNote event is received',async () => {
    const page = await newSpecPage({
      components: [FskNotesList],
      html: `<fsk-notes-list></fsk-notes-list>`,
    });

    const countBefore = getNotesListCount
    const body : HTMLBodyElement = page.doc.querySelector('body')
    const saveNoteEvent = new CustomEvent('saveNote')
    body.dispatchEvent(saveNoteEvent)
    await page.waitForChanges()

    expect(getNotesListCount).toBe(countBefore + 1)
  })
});
