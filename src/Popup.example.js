import React, { useState, useCallback } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { Button } from './Button'
import { Popup } from './Popup'

function PopupSimpleExample() {
  const [anchor, setAnchor] = useState(null)
  const [hidden, setHidden] = useState(true)
  const ref = useCallback(elem => elem === null || setAnchor(elem), [])
  return (
    <>
      <Button
        onClick={ () => setHidden(!hidden) }
        ref={ ref }
      >
        Open simple popup
      </Button>
      { anchor && (
        <Popup
          hidden={ hidden }
          anchor={ anchor }
          onCancelEvent={ () => setHidden(true) }
        >
          <Button onClick={ () => setHidden(true) }>Close the popup</Button>
        </Popup>
      ) }
    </>
  )
}

function PopupModalExample() {
  const [anchor, setAnchor] = useState(null)
  const [hidden, setHidden] = useState(true)
  const ref = useCallback(elem => elem === null || setAnchor(elem), [])
  return (
    <>
      <Button
        onClick={ () => setHidden(!hidden) }
        ref={ ref }
      >
        Open modal popup
      </Button>
      { anchor && (
        <Popup
          modal
          hidden={ hidden }
          anchor={ anchor }
          onCancelEvent={ () => setHidden(true) }
        >
          <Button onClick={ () => setHidden(true) }>Close the popup</Button>
        </Popup>
      ) }
    </>
  )
}

export default function PopupExample() {
  return (
    <Example>
      <Heading>Popup</Heading>
      <PopupSimpleExample/>
      <PopupModalExample/>
    </Example>
  )
}
