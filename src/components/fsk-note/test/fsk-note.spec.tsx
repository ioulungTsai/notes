import { newSpecPage } from '@stencil/core/testing';

const list = JSON.parse(
  `[
    {"id":"1","datetime":"2022-10-16T10:10Z","title":"1st Note","text":"Text for my 1st Note"},
    {"id":"2","datetime":"2022-10-17T10:11Z","title":"2nd Note"},
    {"id":"3","datetime":"2022-10-18T10:12Z","title":"3rd Note"},
    {"id":"4","datetime":"2022-10-19T10:13Z","title":"4th Note"}
  ]`)

let saveOut = []
let deleteId = -1
jest.mock('../../../library/NotesData.ts', () => ({
  getNote: async (id: number) => {return(list[id - 1])},
  saveNote: (id: number, title: string, text: string) => {
    const saved = {id, title, text}
    saveOut.push(saved)
  },
  deleteNote: (id: number) => {deleteId = id}
}))

import { FskNote } from '../fsk-note';

describe('fsk-note', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FskNote],
      html: `<fsk-note note-id="1"></fsk-note>`,
    });
    expect(page.root).toEqualHtml(`
      <fsk-note note-id="1">
        <mock:shadow-root>
          <div class="fsk-note">
            <header class="fsk-note-header">
              <input id="fsk-note-title" value="1st Note">
              <nav id="fsk-note-save" class="fsk-note-button">Save</nav>
              <nav id="fsk-note-delete" class="fsk-note-button">Delete</nav>
              <nav id="fsk-note-close" class="fsk-note-button">Close</nav>
            </header>
            <textarea id="fsk-note-content">Text for my 1st Note</textarea>
          </div>
        </mock:shadow-root>
      </fsk-note>
    `);
  });

  it('should emit event when the close button is clicked', async () => {
    const page = await newSpecPage({
      components: [FskNote],
      html: `<fsk-note note-id="1"></fsk-note>`,
    });

    const button : HTMLElement = (page.root.shadowRoot.querySelector("#fsk-note-close"))
    const spy = jest.fn()
    page.win.addEventListener('closeNote', spy)

    button.click()
    await page.waitForChanges()

    expect(spy).toHaveBeenCalled()
  })

  it('should emit event when the save button is clicked', async () => {
    const page = await newSpecPage({
      components: [FskNote],
      html: `<fsk-note note-id="1"></fsk-note>`,
    });

    const button : HTMLElement = (page.root.shadowRoot.querySelector("#fsk-note-save"))
    const spy = jest.fn()
    page.win.addEventListener('saveNote', spy)

    button.click()
    await page.waitForChanges()

    expect(spy).toHaveBeenCalled()
  })

  it('should save the note when the save button clicked', async () => {
    // Clear saveOut
    saveOut = []

    // Fetch the page
    const page = await newSpecPage({
      components: [FskNote],
      html: `<fsk-note note-id="1"></fsk-note>`,
    });

    // Change values for title and content
    const title : HTMLInputElement = page.root.shadowRoot.querySelector('#fsk-note-title')
    title.value = "Test Note Title"

    const content : HTMLInputElement = page.root.shadowRoot.querySelector('#fsk-note-content')
    content.value = "Test Note Content"

    // Click in the save button
    const button : HTMLElement = (page.root.shadowRoot.querySelector("#fsk-note-save"))
    button.click()
    await page.waitForChanges()

    // Check resaults are as expected
    const expectedSave = {id: 1, title: 'Test Note Title', text: 'Test Note Content'}
    expect(JSON.stringify(saveOut[0])).toBe(JSON.stringify(expectedSave))
  })

  it('should delete note when delete button is clicked', async () => {
    const page = await newSpecPage({
      components: [FskNote],
      html: `<fsk-note note-id="2"></fsk-note>`,
    });

    const spy = jest.fn()
    page.win.addEventListener('closeNote', spy)

    deleteId = -1 // reset for the test
    const button : HTMLElement = (page.root.shadowRoot.querySelector("#fsk-note-delete"))
    button.click()
    await page.waitForChanges()

    expect(deleteId).toBe(2)
    expect(spy).toHaveBeenCalled()
  })
});
