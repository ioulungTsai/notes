import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'
/**
 * Data library for Notes
 * @packageDocumentation
 */

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
  const response = await axios.get(`/api/note/${id}`)
  return response.data
}

/**
 * Save a note
 * @param id : Id of note to save
 * @param newTitle : new title for the note
 * @param newText : edited text for the note
 *
 * @returns id of document saved
 */
export async function saveNote(
  id: number, newTitle: string, newText: string) : Promise<number> {
  const config = { headers: {'Content-Type': 'application/json'}}
  const content = {title: newTitle, text: newText}
  const response = await axios.put('/api/note/save/'+id, content, config)
  return parseInt(response.data)
}

/**
 * Adds a blank note to the list
 *
 * @returns id of the note created
 */
export async function addNote() : Promise<number> {
  const response = await axios.post('/api/note/add')
  return parseInt(response.data)
}

/**
 * Delete a note
 * @param id Id of npte to be deleted
 */
export async function deleteNote(id: number) : Promise<number>{
  const response = await axios.delete('/api/note/'+id)
  return parseInt(response.data)
}
