import React, { useState } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { SelectBox } from './SelectBox'

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

export default function SelectBoxExample() {
  const [value, setValue] = useState(options[2].value)
  return (
    <Example>
      <Heading>SelectBox</Heading>
      <SelectBox label="Not selected"
                 options={ options }/>
      <SelectBox label="Controlled"
                 options={ options }
                 value={ value }
                 onChange={ value => setValue(value) }/>
      <SelectBox label="Uncontrolled"
                 options={ options }
                 defaultValue={ options[2].value }/>
      <SelectBox label="Required"
                 options={ options }
                 defaultValue={ options[2].value }
                 required/>
      <SelectBox label="Disabled"
                 options={ options }
                 disabled/>
    </Example>
  )
}
