import React, { useState, useRef } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { Button } from './Button'
import { Dialog } from './Dialog'
import { TextBox } from './TextBox'

function DialogSimpleExample() {
  const button = useRef(null)
  const [hidden, setHidden] = useState(true)
  return (
    <>
      <Button onClick={ () => setHidden(!hidden) } ref={ button }>
        Dialog
      </Button>
      <Dialog
        hidden={ hidden }
        anchor={ button.current }
        onCancelEvent={ () => setHidden(true) }
      >
        <TextBox label="Say something"/>
        <Button onClick={ () => setHidden(true) }>Close</Button>
      </Dialog>
    </>
  )
}

function DialogModalExample() {
  const modalButton = useRef(null)
  const [hidden, setHidden] = useState(true)
  return (
    <>
      <Button onClick={ () => setHidden(!hidden) } ref={ modalButton }>
        Modal Dialog
      </Button>
      <Dialog
        modal
        hidden={ hidden }
        anchor={ modalButton.current }
        onCancelEvent={ () => setHidden(true) }
      >
        <TextBox label="Say something"/>
        <Button onClick={ () => setHidden(true) }>Close</Button>
      </Dialog>
    </>
  )
}

export default function DialogExample() {
  return (
    <Example>
      <Heading>Dialog</Heading>
      <DialogSimpleExample/>
      <DialogModalExample/>
    </Example>
  )
}
