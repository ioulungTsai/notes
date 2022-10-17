/**
 * Data library for Notes
 * @packageDocumentation
 */

const list = JSON.parse(
`[
  {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note"},
  {"id":"2","datetime":"2022-10-17T10:11Z","title":"My 2nd Note"},
  {"id":"3","datetime":"2022-10-18T10:12Z","title":"My 3rd Note"},
  {"id":"4","datetime":"2022-10-19T10:13Z","title":"My 4th Note"}
]`)

const text = JSON.parse(
`[
  {"id":"1","text":"Text for my 1st Note"},
  {"id":"2","text":"Text for my 2nd Note"},
  {"id":"3","text":"Text for my 3rd Note"},
  {"id":"4","text":"Text for my 4th Note"}
]`)

/**
 * Return list of all notes
 */
export function getList() {
  const clonedList = [...list]
  return (clonedList)
}

/**
 * Fethches data for a single note
 * @param id : Id of the note to fetch
 */
export function getNote(id: number) {
  const note = list[id-1]
  const clonedNote = {...note}
  clonedNote.text = text[id-1].text
  return(clonedNote)
}

/**
 * Save a note
 * @param id : Id of note to save
 * @param newTitle : new title for the note
 * @param newText : edited text for the note
 */
export function saveNote(id: number, newTitle: string, newText: string) {
  const note = list[id - 1]
  note.title = newTitle

  const noteText = text[id - 1]
  noteText.text = newText
}
