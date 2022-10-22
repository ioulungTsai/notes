import * as Utils from "./Utils"

// Get database object
const db = new Utils.DBconnect()

/**
 * Data library for Notes
 * @packageDocumentation
 */
const listDefault = `[
  {"id":"1","datetime":"2022-10-16T10:10Z","title":"My 1st Note"},
  {"id":"2","datetime":"2022-10-17T10:11Z","title":"My 2nd Note"},
  {"id":"3","datetime":"2022-10-18T10:12Z","title":"My 3rd Note"},
  {"id":"4","datetime":"2022-10-19T10:13Z","title":"My 4th Note"}
]`

const list = JSON.parse(listDefault)
const objList = Utils.arrToObj(list, 'id')

const textDefault = `[
  {"id":"1","text":"Text for my 1st Note"},
  {"id":"2","text":"Text for my 2nd Note"},
  {"id":"3","text":"Text for my 3rd Note"},
  {"id":"4","text":"Text for my 4th Note"}
]`
const text = JSON.parse(textDefault)
const objText = Utils.arrToObj(text, 'id')

/**
 * Return list of all notes
 *
 * @returns array of noteListItem
 */
export interface noteListItem {
  id: string,
  datetime: number,
  title: string,
}

export async function getList() : Promise<noteListItem[]>{
  const response = await db.send({
    "operation": "sql",
    "sql": `
      SELECT id,__createdtime__ AS datetime,title
      FROM notes.notes
      ORDER BY datetime
    `
  })
  return (<noteListItem[]>response)
}

/**
 * Converts id to string and checks its validity
 * @param id id to concert to string
 * @throws Error if id is no valid
 */
function getCheckedId(id: string) : string {
  if(!(id in objList))
    throw new Error('Note does not exist!')
  else
    return id
}

/**
 * Fethches data for a single note
 * @param id : Id of the note to fetch
 */
export interface note {
  id: string,
  datetime: number,
  title: string,
  text: string
}

export async function getNote(id: string) : Promise<note>{
  const response = <note[]> await db.send({
    "operation": "sql",
    "sql": `
      SELECT id,__createdtime__ AS datetime, title,text
      FROM notes.notes
      WHERE id='${id}'
    `
  })
  // console.log(`getNote(${id}) response:\n`+JSON.stringify(response, null, 2))
  if(response.length === 0)
    throw new Error('No such note!')
  else
    return response[0]
}

/**
 * Save a note
 * @param id : Id of note to save
 * @param newTitle : new title for the note
 * @param newText : edited text for the note
 */
export function saveNote(id: string, newTitle: string, newText: string) : string {
  const checkedId = getCheckedId(id)
  const note = objList[checkedId]
  note.title = newTitle

  const noteText = objText[checkedId]
  noteText.text = newText

  return checkedId
}

/**
 * Adds a blank note to the list
 *
 * @returns id of the note created
 */
let idCount = 4
export function addNote() : string {
  const newId = (++idCount).toString()
  objList[newId] = {id: newId, datetime: Utils.getDateTime(), title: 'untitled'}
  objText[newId] = {id: newId, text: ''}
  return newId
}

/**
 * Delete a note
 * @param id Id of npte to be deleted
 */
export function deleteNote(id: string) : string{
  const checkedId = getCheckedId(id)
  delete objList[checkedId]
  delete objText[checkedId]

  return checkedId
}

/**
 * Resets dummy data to known state
 */
const dbResetData = JSON.parse(`[
  {"title":"My 1st Note","text":"Text for my 1st Note"},
  {"title":"My 2nd Note","text":"Text for my 2nd Note"},
  {"title":"My 3rd Note","text":"Text for my 3rd Note"},
  {"title":"My 4th Note","text":"Text for my 4th Note"}
]`)

export async function reset() : Promise<void> {
  // Delete all record in notes table
  let response = await db.send({
    "operation":"sql",
    "sql":"DELETE FROM notes.notes"
  })
  // console.log(reponse)

  // Add test records
  for(let i = 0; i<dbResetData.length; ++i) {
    response = await db.send({
      "operation": "sql",
      "sql": `
        INSERT INTO notes.notes (title,text)
        VALUES('${dbResetData[i].title}','${dbResetData[i].text}')
      `
    })
    // console.log(response)
  }
}
