import React from 'react'
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
  return (
    <Test>
      <Heading>ListBox</Heading>
      <ListBox label="Not selected" options={ options }/>
      <ListBox label="Uncontrolled" options={ options } defaultValue={ options[2].value }/>
      <ListBox label="Disabled" options={ options } disabled/>
    </Test>
  )
}
