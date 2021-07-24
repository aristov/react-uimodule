import React, { useState } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { Button } from './Button'

export default function ButtonExample() {
  const [pressed, setPressed] = useState(true)
  return (
    <Example>
      <Heading>Button</Heading>
      <Button>Simple</Button>
      <Button
        pressed={ pressed }
        onClick={ () => setPressed(!pressed) }
      >
        Pressed (controlled)
      </Button>
      <Button defaultPressed={ true }>Pressed (uncontrolled)</Button>
      <Button disabled={ true }>Disabled</Button>
    </Example>
  )
}
