import React, { useState, useCallback } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { Button } from './Button'
import { Dialog } from './Dialog'
import { TextBox } from './TextBox'
import { CloseButton } from './CloseButton'

function DialogSimpleExample() {
  const [anchor, setAnchor] = useState(null)
  const [hidden, setHidden] = useState(true)
  const ref = useCallback(elem => elem && setAnchor(elem), [])
  return (
    <>
      <Button onClick={ () => setHidden(!hidden) } ref={ ref }>
        Open dialog
      </Button>
      { anchor && (
        <Dialog
          title="Hello!"
          hidden={ hidden }
          anchor={ anchor }
          onCancelEvent={ () => setHidden(true) }
        >
          <TextBox label="Say something"/>
          <CloseButton>Close</CloseButton>
        </Dialog>
      ) }
    </>
  )
}

function DialogModalExample() {
  const [anchor, setAnchor] = useState(null)
  const [hidden, setHidden] = useState(true)
  const ref = useCallback(elem => elem && setAnchor(elem), [])
  return (
    <>
      <Button onClick={ () => setHidden(!hidden) } ref={ ref }>
        Open modal dialog
      </Button>
      { anchor && (
        <Dialog
          modal
          title="Hello!"
          hidden={ hidden }
          anchor={ anchor }
          onCancelEvent={ () => setHidden(true) }
        >
          <TextBox label="Say something"/>
          <CloseButton>Close</CloseButton>
        </Dialog>
      ) }
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
