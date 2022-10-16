/**
 * Data library for Notes
 * @packageDocumentation
 */

const list =
`[
  {"id":"1","datetime":"2022-10-16T10:10Z","title":"1st Note"},
  {"id":"2","datetime":"2022-10-17T10:11Z","title":"2nd Note"},
  {"id":"3","datetime":"2022-10-18T10:12Z","title":"3rd Note"},
  {"id":"4","datetime":"2022-10-19T10:13Z","title":"4th Note"}
]`

/**
 * Return list of all notes
 */
export function getList() {
  return (JSON.parse(list))
}
