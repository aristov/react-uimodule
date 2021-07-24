import React, { useState, useRef } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { Button } from './Button'
import { Dialog } from './Dialog'
import { TextBox } from './TextBox'
import { DialogHead } from './DialogHead'
import { DialogBody } from './DialogBody'
import { CancelButton } from './CancelButton'
import { CloseButton } from './CloseButton'

function DialogSimpleExample() {
  const button = useRef(null)
  const [hidden, setHidden] = useState(true)
  return (
    <>
      <Button onClick={ () => setHidden(!hidden) } ref={ button }>
        Open simple dialog
      </Button>
      <Dialog
        hidden={ hidden }
        anchor={ button.current }
        onCancelEvent={ () => setHidden(true) }
      >
        <DialogHead>
          <Heading>Hello!</Heading>
          <CancelButton/>
        </DialogHead>
        <DialogBody>
          <TextBox label="Say something"/>
          <CloseButton>Close</CloseButton>
        </DialogBody>
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
        hidden={ hidden }
        anchor={ button.current }
        onCancelEvent={ () => setHidden(true) }
      >
        <DialogHead>
          <Heading>Hello!</Heading>
          <CancelButton/>
        </DialogHead>
        <DialogBody>
          <TextBox label="Say something"/>
          <CloseButton>Close</CloseButton>
        </DialogBody>
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
