import React from 'react'
import { Test } from './Test'
import { Button } from './Button'
import './Showcase.css'

function Showcase() {
  return (
    <div className="Showcase">
      <Test>
        <Button>Simple</Button>
        <Button pressed={ true }>Pressed</Button>
        <Button disabled={ true }>Disabled</Button>
      </Test>
    </div>
  )
}

export { Showcase }
