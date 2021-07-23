import React from 'react'
import { Test } from './Test'
import { Heading } from './Heading'
import { Button } from './Button'
import { CheckBox } from './CheckBox'
import { RadioGroup } from './RadioGroup'
import { ListBox } from './ListBox'
import { TextBox } from './TextBox'
import { Popup } from './Popup'
import './Showcase.css'

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

class Showcase extends React.Component
{
  _popupButton = React.createRef()

  state = {
    isPressed : true,
    isChecked : true,
    textValue : 'Hello world!',
    radioValue : radios[1].value,
    popupHidden : true,
  }

  render() {
    return (
      <div className="Showcase">
        <Test>
          <Heading>Popup</Heading>
          <Button
            onClick={ () => this.setState(state => ({ popupHidden : !state.popupHidden })) }
            ref={ this._popupButton }
          >
            Popup
          </Button>
          <Popup
            hidden={ this.state.popupHidden }
            anchor={ this._popupButton.current }
            onClickOutside={ () => this.setState({ popupHidden : true }) }
          >
            <Button onClick={ () => this.setState({ popupHidden : true }) }>Close the popup</Button>
          </Popup>
        </Test>
        <Test>
          <Heading>TextBox</Heading>
          <TextBox label="Empty"/>
          <TextBox
            label="Controlled"
            value={ this.state.textValue }
            onChange={ e => this.setState({ textValue : e.target.value }) }
          />
          <TextBox label="Uncontrolled" defaultValue="Hello world!"/>
          <TextBox label="Disabled" disabled/>
        </Test>
        <Test>
          <Heading>Button</Heading>
          <Button>Simple</Button>
          <Button
            pressed={ this.state.isPressed }
            onClick={ () => this.setState(state => ({ isPressed : !state.isPressed })) }
          >Pressed (controlled)</Button>
          <Button defaultPressed={ true }>Pressed (uncontrolled)</Button>
          <Button disabled={ true }>Disabled</Button>
        </Test>
        <Test>
          <Heading>CheckBox</Heading>
          <CheckBox>Not checked</CheckBox>
          <CheckBox
            checked={ this.state.isChecked }
            onClick={ () => this.setState(state => ({ isChecked : !state.isChecked })) }
          >Controlled</CheckBox>
          <CheckBox defaultChecked>Uncontrolled</CheckBox>
          <CheckBox defaultChecked="mixed">Mixed</CheckBox>
          <CheckBox disabled>Disabled</CheckBox>
        </Test>
        <Test>
          <Heading>RadioGroup</Heading>
          <RadioGroup label="Not checked" radios={ radios }/>
          <RadioGroup
            label="Controlled"
            radios={ radios }
            value={ this.state.radioValue }
            onChange={ value => this.setState({ radioValue : value }) }
          />
          <RadioGroup label="Uncontrolled" radios={ radios } defaultValue={ radios[1].value }/>
          <RadioGroup label="Disabled" radios={ radios } disabled/>
        </Test>
        <Test>
          <Heading>ListBox</Heading>
          <ListBox label="Not selected" options={ options }/>
          <ListBox label="Uncontrolled" options={ options } defaultValue={ options[2].value }/>
          <ListBox label="Disabled" options={ options } disabled/>
        </Test>
      </div>
    )
  }
}

export { Showcase }
