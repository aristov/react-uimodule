import React, { useState, useRef } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { Button } from './Button'
import { Popup } from './Popup'

export default function PopupExample() {
  const button = useRef(null)
  const modalButton = useRef(null)
  const [hidden, setHidden] = useState(true)
  const [modalHidden, setModalHidden] = useState(true)
  return (
    <Example>
      <Heading>Popup</Heading>
      <Button onClick={ () => setHidden(!hidden) } ref={ button }>
        Popup
      </Button>
      <Popup
        hidden={ hidden }
        anchor={ button.current }
        onCancelEvent={ () => setHidden(true) }
      >
        <Button onClick={ () => setHidden(true) }>Close the popup</Button>
      </Popup>

      <Button onClick={ () => setModalHidden(!modalHidden) } ref={ modalButton }>
        Modal popup
      </Button>
      <Popup
        modal
        hidden={ modalHidden }
        anchor={ modalButton.current }
        onCancelEvent={ () => setModalHidden(true) }
      >
        <Button onClick={ () => setModalHidden(true) }>Close the popup</Button>
      </Popup>
    </Example>
  )
}
