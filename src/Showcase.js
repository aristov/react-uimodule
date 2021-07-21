import React from 'react'
import { Test } from './Test'
import { Button } from './Button'
import './Showcase.css'

class Showcase extends React.Component
{
  state = {
    buttonPressed : true,
  }

  render() {
    return (
      <div className="Showcase">
        <Test>
          <Button>Simple</Button>
          <Button
            pressed={ this.state.buttonPressed }
            onClick={ () => this.setState(state => ({ buttonPressed : !state.buttonPressed })) }
          >
            Pressed
          </Button>
          <Button defaultPressed={ true }>
            DefaultPressed
          </Button>
          <Button disabled={ true }>Disabled</Button>
        </Test>
      </div>
    )
  }
}

export { Showcase }
