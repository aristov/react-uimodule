import React, { useState } from 'react'
import { Test } from './Test'
import { Heading } from './Heading'
import { RadioGroup } from './RadioGroup'

const radios = [
  'Rehearsal',
  'Lesson',
  'Practice',
]
.map(text => ({ text, value : text }))

export default function ButtonExample() {
  const [value, setValue] = useState(radios[1].value)
  return (
    <Test>
      <Heading>RadioGroup</Heading>
      <RadioGroup label="Not checked" radios={ radios }/>
      <RadioGroup
        label="Controlled"
        radios={ radios }
        value={ value }
        onChange={ value => setValue(value) }
      />
      <RadioGroup label="Uncontrolled" radios={ radios } defaultValue={ radios[1].value }/>
      <RadioGroup label="Disabled" radios={ radios } disabled/>
    </Test>
  )
}
