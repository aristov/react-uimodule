import React, { useState } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { CheckBox } from './CheckBox'

export default function ButtonExample() {
  const [checked, setChecked] = useState(true)
  return (
    <Example>
      <Heading>CheckBox</Heading>
      <CheckBox label="Not checked"/>
      <CheckBox
        label="Controlled"
        checked={ checked }
        onClick={ () => setChecked(!checked) }
      />
      <CheckBox
        label="Uncontrolled"
        defaultChecked
      />
      <CheckBox
        label="Mixed"
        defaultChecked="mixed"
      />
      <CheckBox
        label="Disabled"
        disabled
      />
    </Example>
  )
}
