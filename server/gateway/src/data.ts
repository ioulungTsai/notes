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
export function getNote(id: string) {
  const strId = getCheckedId(id)

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
  {"title":"My First Note","text":"Text for my first note"},
  {"title":"My Second Note","text":"Text for my second note"},
  {"title":"My Third Note","text":"Text for my third note"},
  {"title":"My Fourth Note","text":"Text for my fourth note"}
]`)

export async function reset() : Promise<void> {
  // Delete all record in notes table
  let reponse = await db.send({
    "operation":"sql",
    "sql":"DELETE FROM notes.notes"
  })
  console.log(reponse)

  // Add test records
  for(let i = 0; i<dbResetData.length; ++i) {
    reponse = await db.send({
      "operation": "sql",
      "sql": `
        INSERT INTO notes.notes (title,text)
        VALUES('${dbResetData[i].title}','${dbResetData[i].text}')
      `
    })
    console.log(reponse)
  }
}
