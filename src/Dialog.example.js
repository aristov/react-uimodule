import React, { useState, useRef } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { Button } from './Button'
import { Dialog } from './Dialog'
import { TextBox } from './TextBox'
import { CloseButton } from './CloseButton'

function DialogSimpleExample() {
  const button = useRef(null)
  const [hidden, setHidden] = useState(true)
  return (
    <>
      <Button onClick={ () => setHidden(!hidden) } ref={ button }>
        Open dialog
      </Button>
      <Dialog
        title="Hello!"
        hidden={ hidden }
        anchor={ button.current }
        onCancelEvent={ () => setHidden(true) }
      >
        <TextBox label="Say something"/>
        <CloseButton>Close</CloseButton>
      </Dialog>
    </>
  )
}

function DialogModalExample() {
  const button = useRef(null)
  const [hidden, setHidden] = useState(true)
  return (
    <>
      <Button onClick={ () => setHidden(!hidden) } ref={ button }>
        Open modal dialog
      </Button>
      <Dialog
        modal
        title="Hello!"
        hidden={ hidden }
        anchor={ button.current }
        onCancelEvent={ () => setHidden(true) }
      >
        <TextBox label="Say something"/>
        <CloseButton>Close</CloseButton>
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
