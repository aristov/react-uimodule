import React from 'react'
import { Test } from './Test'
import { Heading } from './Heading'
import { Button } from './Button'
import { CheckBox } from './CheckBox'
import { RadioGroup } from './RadioGroup'
import { ListBox } from './ListBox'
import { TextBox } from './TextBox'
import './Showcase.css'

class Showcase extends React.Component
{
  state = {
    isPressed : true,
    isChecked : true,
    textValue : 'Hello world!',
  }

  render() {
    return (
      <div className="Showcase">
        <Test>
          <Heading>TextBox</Heading>
          <TextBox label="Simple"/>
          <TextBox
            label="Value"
            value={ this.state.textValue }
            onChange={ e => this.setState({ textValue : e.target.value }) }
          />
          <TextBox label="DefaultValue" defaultValue="Hello world!"/>
          <TextBox label="Disabled" disabled/>
        </Test>
        <Test>
          <Heading>Button</Heading>
          <Button>Simple</Button>
          <Button
            pressed={ this.state.isPressed }
            onClick={ () => this.setState(state => ({ isPressed : !state.isPressed })) }
          >Pressed</Button>
          <Button defaultPressed={ true }>
            DefaultPressed
          </Button>
          <Button disabled={ true }>Disabled</Button>
        </Test>
        <Test>
          <Heading>CheckBox</Heading>
          <CheckBox>Simple</CheckBox>
          <CheckBox
            checked={ this.state.isChecked }
            onClick={ () => this.setState(state => ({ isChecked : !state.isChecked })) }
          >Checked</CheckBox>
          <CheckBox defaultChecked>DefaultChecked</CheckBox>
          <CheckBox defaultChecked="mixed">Mixed</CheckBox>
          <CheckBox disabled>Disabled</CheckBox>
        </Test>
        <Test>
          <Heading>RadioGroup</Heading>
          <RadioGroup label="Simple" radios={ radios }/>
          <RadioGroup label="Checked" radios={ radios } defaultValue={ radios[1].value }/>
          <RadioGroup label="Disabled" radios={ radios } disabled/>
        </Test>
        <Test>
          <Heading>ListBox</Heading>
          <ListBox label="Simple" options={ options }/>
          <ListBox label="Selected" options={ options } defaultValue={ options[2].value }/>
          <ListBox label="Disabled" options={ options } disabled/>
        </Test>
      </div>
    )
  }
}

const radios = [
  'Rehearsal',
  'Lesson',
  'Practice',
]
.map(text => ({ text, value : text }))

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
