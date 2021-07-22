import React from 'react'
import { Test } from './Test'
import { Button } from './Button'
import './Showcase.css'
import { ListBox } from './ListBox'

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
        <Test>
          <ListBox options={ options.map(text => ({ text, value : text })) }/>
          <ListBox options={ options.map(text => ({ text, value : text })) }
                   defaultValue={ options[2] }
          />
          <ListBox options={ options.map(text => ({ text, value : text })) }
                   disabled
          />
        </Test>
        <Test>

        </Test>
      </div>
    )
  }
}

const options = [
  'Rehearsal',
  'Lesson',
  'Practice',
  'Master class',
  'Concert',
  'Party',
  'Parking',
]

export { Showcase }
