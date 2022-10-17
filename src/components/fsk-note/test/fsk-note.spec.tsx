import { newSpecPage } from '@stencil/core/testing';

const list = JSON.parse(
  `[
    {"id":"1","datetime":"2022-10-16T10:10Z","title":"1st Note"},
    {"id":"2","datetime":"2022-10-17T10:11Z","title":"2nd Note"},
    {"id":"3","datetime":"2022-10-18T10:12Z","title":"3rd Note"},
    {"id":"4","datetime":"2022-10-19T10:13Z","title":"4th Note"}
  ]`)

const text = JSON.parse(
  `[
    {"id":"1","text":"Text for my 1st Note"},
    {"id":"2","text":"Text for my 2nd Note"},
    {"id":"3","text":"Text for my 3rd Note"},
    {"id":"4","text":"Text for my 4th Note"}
  ]`)

jest.mock('../../../library/NotesData.ts', () => ({
  getNote: (id: number) => {
    const note = list[id-1]
    const clonedNote = {...note}
    clonedNote.text = text[id-1].text
    return(clonedNote)}
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
              <strong>1st Note</strong>
              <nav class="fsk-note-button">close</nav>
            </header>
            <div class="fsk-note-content">
              Text for my 1st Note
            </div>
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

    const button : HTMLElement = (page.root.shadowRoot.querySelector(".fsk-note-button"))
    const spy = jest.fn()
    page.win.addEventListener('closeNote', spy)

    button.click()
    await page.waitForChanges()

    expect(spy).toHaveBeenCalled()
  })
});
