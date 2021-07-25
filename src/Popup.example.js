import React, { useState, useCallback } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { Button } from './Button'
import { Popup } from './Popup'

function PopupSimpleExample() {
  const [hidden, setHidden] = useState(true)
  const [anchor, setAnchor] = useState(null)
  const getAnchor = useCallback(elem => elem === null || setAnchor(elem), [])
  return (
    <>
      <Button
        onClick={ () => setHidden(!hidden) }
        ref={ getAnchor }
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
  const [expanded, setExpanded] = useState(false)
  const [anchor, setAnchor] = useState(null)
  const getAnchor = useCallback(elem => elem === null || setAnchor(elem), [])
  return (
    <>
      <Button
        onClick={ () => setExpanded(!expanded) }
        aria-expanded={ expanded }
        ref={ getAnchor }
      >
        Open modal popup
      </Button>
      { anchor && (
        <Popup
          modal
          hidden={ !expanded }
          anchor={ anchor }
          onCancelEvent={ e => e.type === 'focusin' || setExpanded(false) }
        >
          <Button onClick={ () => setExpanded(false) }>Close the popup</Button>
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
