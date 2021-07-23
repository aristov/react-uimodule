import React, { useState } from 'react'
import { Test } from './Test'
import { Heading } from './Heading'
import { CheckBox } from './CheckBox'

export default function ButtonExample() {
  const [checked, setChecked] = useState(true)
  return (
    <Test>
      <Heading>CheckBox</Heading>
      <CheckBox>Not checked</CheckBox>
      <CheckBox checked={ checked } onClick={ () => setChecked(!checked) }>
        Controlled
      </CheckBox>
      <CheckBox defaultChecked>Uncontrolled</CheckBox>
      <CheckBox defaultChecked="mixed">Mixed</CheckBox>
      <CheckBox disabled>Disabled</CheckBox>
    </Test>
  )
}
