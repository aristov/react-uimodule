import React, { useState, useRef } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { Button } from './Button'
import { Popup } from './Popup'

function PopupSimpleExample() {
  const button = useRef(null)
  const [hidden, setHidden] = useState(true)
  return (
    <>
      <Button onClick={ () => setHidden(!hidden) } ref={ button }>
        Open simple popup
      </Button>
      <Popup
        hidden={ hidden }
        anchor={ button.current }
        onCancelEvent={ () => setHidden(true) }
      >
        <Button onClick={ () => setHidden(true) }>Close the popup</Button>
      </Popup>
    </>
  )
}

function PopupModalExample() {
  const modalButton = useRef(null)
  const [hidden, setHidden] = useState(true)
  return (
    <>
      <Button
        onClick={ () => setHidden(!hidden) }
        ref={ modalButton }
      >
        Open modal popup
      </Button>
      <Popup
        modal
        hidden={ hidden }
        anchor={ modalButton.current }
        onCancelEvent={ () => setHidden(true) }
      >
        <Button onClick={ () => setHidden(true) }>Close the popup</Button>
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
