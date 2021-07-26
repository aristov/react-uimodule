import React, { useState } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { TextBox } from './TextBox'

export default function TextBoxExample() {
  const [value, setValue] = useState('Hello React!')
  return (
    <Example>
      <Heading>TextBox</Heading>
      <TextBox label="Empty"/>
      <TextBox
        label="Controlled"
        value={ value }
        onChange={ e => setValue(e.target.value) }
      />
      <TextBox
        label="Uncontrolled"
        defaultValue="Hello React!"
      />
      <TextBox
        label="Disabled"
        disabled
      />
    </Example>
  )
}
