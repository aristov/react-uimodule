import React, { useState, useRef, useCallback } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { Button } from './Button'
import { Dialog } from './Dialog'
import { TextBox } from './TextBox'
import { CloseButton } from './CloseButton'

function DialogSimpleExample() {
  const [expanded, setExpanded] = useState(false)
  const [rendered, setRendered] = useState(false)
  const ref = useCallback(button => button && setRendered(true), [])
  const domRef = useRef(null)
  return (
    <>
      <Button
        onClick={ () => setExpanded(!expanded) }
        ref={ ref }
        domRef={ domRef }
      >
        Open dialog
      </Button>
      <Dialog
        title="Hello!"
        hidden={ !rendered || !expanded }
        anchor={ domRef.current }
        onCancelEvent={ () => setExpanded(false) }
      >
        <TextBox label="Say something"/>
        <CloseButton>Close</CloseButton>
      </Dialog>
    </>
  )
}

function DialogModalExample() {
  const [hidden, setHidden] = useState(true)
  const [rendered, setRendered] = useState(false)
  const ref = useCallback(button => button && setRendered(true), [])
  const domRef = useRef(null)
  return (
    <>
      <Button
        onClick={ () => setHidden(!hidden) }
        ref={ ref }
        domRef={ domRef }
      >
        Open modal dialog
      </Button>
      <Dialog
        modal
        title="Hello!"
        hidden={ !rendered || hidden }
        anchor={ domRef.current }
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
