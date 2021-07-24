import React, { useState, useRef } from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { Button } from './Button'
import { Popup } from './Popup'

export default function PopupExample() {
  const button = useRef(null)
  const [hidden, setHidden] = useState(true)
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
    </Example>
  )
}
