import React, { useState } from 'react'
import { Test } from './Test'
import { Heading } from './Heading'
import { TextBox } from './TextBox'

export default function ButtonExample() {
  const [value, setValue] = useState('Hello React!')
  return (
    <Test>
      <Heading>TextBox</Heading>
      <TextBox label="Empty"/>
      <TextBox
        label="Controlled"
        value={ value }
        onChange={ e => setValue(e.target.value) }
      />
      <TextBox label="Uncontrolled" defaultValue="Hello React!"/>
      <TextBox label="Disabled" disabled/>
    </Test>
  )
}
