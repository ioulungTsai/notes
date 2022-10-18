/**
 * Contain utility functions
 * @packageDocumentation
 */

/**
 * Get current date and time in ISO format
 *
 * @returns date time in ISO string format
 */
 export function getDateTime() : string {
  const date = new Date(Date.now()) // Use Date.now() to make code testable
  return date.toISOString()
}

/**
 * Converts an array into an object with each preoperty of the object
 * set to an array element
 *
 * @param arr: array to convert into an object
 * @param key: define which item in the array is to become the key
 * @return object derived from the array
 */
export function arrToObj(arr: any, key: string) {
  const initialValue = {}
  return arr.reduce((obj: Object, item: any) => {
    return {
      ...obj,
      [item[key]]: item
    }
  }, initialValue)
}
