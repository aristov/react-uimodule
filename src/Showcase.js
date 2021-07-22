import React from 'react'
import { Test } from './Test'
import { Button } from './Button'
import { CheckBox } from './CheckBox'
import { ListBox } from './ListBox'
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
        <Test>
          <CheckBox>Simple</CheckBox>
          <CheckBox checked>Checked</CheckBox>
          <CheckBox defaultChecked>DefaultChecked</CheckBox>
          <CheckBox defaultChecked="mixed">Mixed</CheckBox>
          <CheckBox disabled>Disabled</CheckBox>
        </Test>
        <Test>
          <ListBox label="Simple" options={ options }/>
          <ListBox label="Selected" options={ options } defaultValue={ options[2] }/>
          <ListBox label="Disabled" options={ options } disabled/>
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
.map(text => ({ text, value : text }))

export { Showcase }
