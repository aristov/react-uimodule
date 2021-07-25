let counter = 0

export default function generateId() { // fixme: 1, 3, 5, 7, ...
  let id, str
  do {
    str = (counter++).toString(36)
    id = 'ID_' + '0'.repeat(Math.max(0, 7 - str.length)) + str
  }
  while(document.getElementById(id))
  return id
}
