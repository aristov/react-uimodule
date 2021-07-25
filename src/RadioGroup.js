import React from 'react'
import { Radio } from './Radio'
import { Label } from './Label'
import './RadioGroup.css'

export class RadioGroup extends React.Component
{
  state = {
    active : false,
    value : this.props.defaultValue || null,
  }

  elem = React.createRef()

  render() {
    const value = this.props.value ?? this.state.value
    return (
      <div
        className={ ['RadioGroup Widget', this.state.active && 'active'].filter(Boolean).join(' ') }
        tabIndex={ this.props.disabled? null : 0 }
        role="radiogroup"
        aria-disabled={ this.props.disabled }
        onKeyDown={ this.onKeyDown }
        onKeyUp={ this.onKeyUp }
        ref={ this.elem }
      >
        { this.props.label && <Label>{ this.props.label }</Label> }
        {
          this.props.radios.map((radio, i) => {
            return (
              <Radio
                label={ radio.label }
                key={ radio.value || radio.label }
                value={ radio.value || radio.label }
                checked={ radio.value === value }
                disabled={ this.props.disabled }
                focus={ value? radio.value === value : !i }
                updateValue={ this.updateValue }
              />
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
    this.props.onChange?.(value)
  }

  moveFocus(offset) {
    const value = this.props.value || this.state.value
    const radios = this.props.radios
    let index = radios.length + offset
    if(value) {
      index += radios.findIndex(radio => radio.value === value)
    }
    index %= radios.length
    this.updateValue(radios[index].value)
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
    this.setState({
      active : false,
      value : this.state.value || this.props.radios[0].value
    })
  }

  get node() {
    return this.elem.current
  }
}
