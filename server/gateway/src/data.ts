import * as Utils from "./Utils"

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
const objList = Utils.arrToObj(list, 'id')

const text = JSON.parse(
`[
  {"id":"1","text":"Text for my 1st Note"},
  {"id":"2","text":"Text for my 2nd Note"},
  {"id":"3","text":"Text for my 3rd Note"},
  {"id":"4","text":"Text for my 4th Note"}
]`)
const objText = Utils.arrToObj(text, 'id')

/**
 * Return list of all notes
 */
export function getList() {
  const arrayList = Object.values(objList)
  const clonedList = JSON.parse(JSON.stringify(arrayList))
  return (clonedList)
}

/**
 * Converts id to string and checks its validity
 * @param id id to concert to string
 * @throws Error if id is no valid
 */
function getStrId(id: string) : string {
  if(!(id in objList))
    throw new Error('Note does not exist!')
  else
    return id
}

/**
 * Fethches data for a single note
 * @param id : Id of the note to fetch
 */
export function getNote(id: string) {
  const strId = getStrId(id)

  const note = objList[strId]
  const clonedNote = {...note}
  clonedNote.text = objText[strId].text
  return(clonedNote)
}

/**
 * Save a note
 * @param id : Id of note to save
 * @param newTitle : new title for the note
 * @param newText : edited text for the note
 */
export function saveNote(id: number, newTitle: string, newText: string) {
  const note = objList[id.toString()]
  note.title = newTitle

  const noteText = objText[id.toString()]
  noteText.text = newText
}

/**
 * Adds a blank note to the list
 *
 * @returns id of the note created
 */
let idCount = 4
export function addNote() : number {
  const newId = (++idCount).toString()
  objList[newId] = {id: newId, datetime: Utils.getDateTime(), title: 'untitled'}
  objText[newId] = {id: newId, text: ''}
  return parseInt(newId)
}

/**
 * Delete a note
 * @param id Id of npte to be deleted
 */
export function deleteNote(id: number) {
  delete objList[id.toString()]
  delete objText[id.toString()]
}
