import React, { useState } from 'react'
import { Heading } from './Heading'
import { ListBox } from './ListBox'
import { Test } from './Test'

const options = [
  'Rehearsal',
  'Lesson',
  'Practice',
  'Master class',
  'Concert',
  'Party',
  'Parking',
]
.map(text => ({ text, value : text }))

export default function ListBoxExample() {
  const [value, setValue] = useState(options[2].value)
  return (
    <Test>
      <Heading>ListBox</Heading>
      <ListBox label="Not selected" options={ options }/>
      <ListBox label="Controlled"
               options={ options }
               value={ value }
               onChange={ value => setValue(value) }/>
      <ListBox label="Uncontrolled" options={ options } defaultValue={ options[2].value }/>
      <ListBox label="Disabled" options={ options } disabled/>
    </Test>
  )
}
