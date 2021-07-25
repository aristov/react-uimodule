import React, { useState, useCallback } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { Button } from './Button'
import { Dialog } from './Dialog'
import { TextBox } from './TextBox'
import { CloseButton } from './CloseButton'

function DialogSimpleExample() {
  const [expanded, setExpanded] = useState(false)
  const [anchor, setAnchor] = useState(null)
  const getAnchor = useCallback(elem => elem && setAnchor(elem), [])
  return (
    <>
      <Button
        onClick={ () => setExpanded(!expanded) }
        ref={ getAnchor }
      >
        Open dialog
      </Button>
      <Dialog
        title="Hello!"
        hidden={ !anchor || !expanded }
        anchor={ anchor }
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
  const [anchor, setAnchor] = useState(null)
  const getAnchor = useCallback(elem => elem && setAnchor(elem), [])
  return (
    <>
      <Button
        onClick={ () => setHidden(!hidden) }
        ref={ getAnchor }
      >
        Open modal dialog
      </Button>
      <Dialog
        modal
        title="Hello!"
        hidden={ !anchor || hidden }
        anchor={ anchor }
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
