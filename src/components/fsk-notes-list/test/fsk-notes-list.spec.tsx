import { newSpecPage } from '@stencil/core/testing';

jest.mock('../../../library/NotesData', () => ({
  getList: () => JSON.parse(
    `[
      {"id":"1","datetime":"2022-10-16T10:10Z","title":"1st Note"},
      {"id":"2","datetime":"2022-10-17T10:11Z","title":"2nd Note"},
      {"id":"3","datetime":"2022-10-18T10:12Z","title":"3rd Note"},
      {"id":"4","datetime":"2022-10-19T10:13Z","title":"4th Note"}
    ]`
  )
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
            <div>Notes List</div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date/Time</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2022-10-16T10:10Z</td>
                  <td>1st Note</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>2022-10-17T10:11Z</td>
                  <td>2nd Note</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>2022-10-18T10:12Z</td>
                  <td>3rd Note</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>2022-10-19T10:13Z</td>
                  <td>4th Note</td>
                </tr>
              </tbody>
            </table>
          </div>
        </mock:shadow-root>
      </fsk-notes-list>
    `);
  });
});
