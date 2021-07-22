import React from 'react'
import { Radio } from './Radio'
import { Label } from './Label'
import './RadioGroup.css'

export class RadioGroup extends React.Component
{
  state = {
    active : false,
    value : this.props.defaultValue,
  }

  render() {
    const value = this.state.value
    return (
      <div
        role="radiogroup"
        className={ ['RadioGroup Widget', this.state.active && 'active'].filter(Boolean).join(' ') }
        tabIndex={ this.props.disabled? null : 0 }
        aria-disabled={ this.props.disabled }
        onKeyDown={ this.onKeyDown }
        onKeyUp={ this.onKeyUp }
      >
        {
          this.props.label && <Label>{ this.props.label }</Label>
        }
        {
          this.props.radios.map((radio, i) => {
            return (
              <Radio key={ radio.value || radio.text }
                     value={ radio.value || radio.text }
                     checked={ radio.value === value }
                     disabled={ this.props.disabled }
                     focus={ value? radio.value === value : !i }
                     updateValue={ this.updateValue }
              >{ radio.text }</Radio>
            )
          })
        }
      </div>
    )
  }

  updateValue = value => {
    if(this.props.disabled) {
      return
    }
    this.setState({ value })
  }

  moveFocus(offset) {
    const value = this.state.value
    const radios = this.props.radios
    let index = radios.length + offset
    if(value) {
      index += radios.findIndex(radio => radio.value === value)
    }
    index %= radios.length
    this.setState({ value : radios[index].value })
  }

  onKeyDown = e => {
    const handler = this['onKeyDown_' + e.code]
    if(typeof handler === 'function') {
      handler.call(this, e)
    }
  }

  onKeyUp = e => {
    const handler = this['onKeyUp_' + e.code]
    if(typeof handler === 'function') {
      handler.call(this, e)
    }
  }

  onKeyDown_ArrowUp(e) {
    e.preventDefault()
    this.moveFocus(-1)
  }

  onKeyDown_ArrowDown(e) {
    e.preventDefault()
    this.moveFocus(1)
  }

  onKeyDown_ArrowLeft(e) {
    e.preventDefault()
    this.moveFocus(-1)
  }

  onKeyDown_ArrowRight(e) {
    e.preventDefault()
    this.moveFocus(1)
  }

  onKeyDown_Space(e) {
    e.preventDefault()
    this.setState({ active : true })
  }

  onKeyUp_Space() {
    this.setState({ active : false })
  }
}
