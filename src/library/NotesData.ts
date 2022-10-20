import * as Utils from "./Utils"
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'
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
export async function getList() : Promise<Array<Record<string, string>>> {
  const response = await axios.get('/api/list')
  console.log(response.data)
  return response.data
}

/**
 * Fethches data for a single note
 * @param id : Id of the note to fetch
 */
export async function getNote(id: number) {
  if(!(id.toString() in objList)) return {}

  const gatewayMsg = await axios.get('/api/note/5')
  console.log(gatewayMsg.data)

  const note = objList[id.toString()]
  const clonedNote = {...note}
  clonedNote.text = objText[id.toString()].text
  return(clonedNote)
}

/**
 * Save a note
 * @param id : Id of note to save
 * @param newTitle : new title for the note
 * @param newText : edited text for the note
 */
export async function saveNote(id: number, newTitle: string, newText: string) {
  const gatewayMsg = await axios.put('/api/note/save/1')
  console.log(gatewayMsg.data)

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
export async function addNote() : Promise<number> {
  const msg = await axios.post('/api/note/add')
  console.log(msg.data)
  const newId = (++idCount).toString()
  objList[newId] = {id: newId, datetime: Utils.getDateTime(), title: 'untitled'}
  objText[newId] = {id: newId, text: ''}
  return parseInt(newId)
}

/**
 * Delete a note
 * @param id Id of npte to be deleted
 */
export async function deleteNote(id: number) {
  const msg = await axios.delete('/api/note/1')
  console.log(msg.data)

  delete objList[id.toString()]
  delete objText[id.toString()]
}
