import React, { useState } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { ListBox } from './ListBox'

const options = [
  'Rehearsal',
  'Lesson',
  'Practice',
  'Master class',
  'Concert',
  'Party',
  'Parking',
]
.map((text, i) => ({ text, value : String(i) }))

export default function ListBoxExample() {
  const [value, setValue] = useState(options[2].value)
  return (
    <Example>
      <Heading>ListBox</Heading>
      <ListBox
        label="Not selected"
        options={ options }
      />
      <ListBox
        label="Controlled"
        options={ options }
        value={ value }
        onChange={ value => setValue(value) }
      />
      <ListBox
        label="Uncontrolled"
        options={ options }
        defaultValue={ options[2].value }
      />
      <ListBox
        label="Disabled"
        options={ options }
        disabled
      />
    </Example>
  )
}
