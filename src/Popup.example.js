import React, { useState, useRef, useCallback } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { Button } from './Button'
import { Popup } from './Popup'

function PopupSimpleExample() {
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
        Open popup
      </Button>
      <Popup
        hidden={ !rendered || hidden }
        anchor={ domRef.current }
        onCancelEvent={ () => setHidden(true) }
      >
        <Button onClick={ () => setHidden(true) }>Close the popup</Button>
      </Popup>
    </>
  )
}

function PopupModalExample() {
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
        Open modal popup
      </Button>
      <Popup
        modal
        hidden={ !rendered || !expanded }
        anchor={ domRef.current }
        onCancelEvent={ e => e.type === 'focusin' || setExpanded(false) }
      >
        <Button onClick={ () => setExpanded(false) }>Close the popup</Button>
      </Popup>
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
