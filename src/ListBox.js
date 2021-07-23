import React from 'react'
import { Control } from './Control'
import { Label } from './Label'
import { Option } from './Option'
import './ListBox.css'

export class ListBox extends React.Component
{
  state = {
    active : false,
    value : this.props.defaultValue,
  }

  render() {
    const value = this.props.value ?? this.state.value
    return (
      <div
        role="listbox"
        className={ ['ListBox Widget', this.state.active && 'active'].filter(Boolean).join(' ') }
        tabIndex={ this.props.disabled? null : 0 }
        aria-disabled={ this.props.disabled }
        onKeyDown={ this.onKeyDown }
        onKeyUp={ this.onKeyUp }
      >
        {
          this.props.label && <Label>{ this.props.label }</Label>
        }
        <Control>{
          this.props.options.map(option => {
            return (
              <Option key={ option.value || option.text }
                      value={ option.value || option.text }
                      selected={ option.value === value }
                      disabled={ this.props.disabled }
                      updateValue={ this.updateValue }
              >{ option.text }</Option>
            )
          })
        }</Control>
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
    const value = this.state.value
    const options = this.props.options
    const index = options.findIndex(option => option.value === value) - 1
    if(index > -1) {
      this.updateValue(options[index].value)
    }
  }

  onKeyDown_ArrowDown(e) {
    e.preventDefault()
    const value = this.state.value
    const options = this.props.options
    const index = options.findIndex(option => option.value === value) + 1
    if(index < options.length) {
      this.updateValue(options[index].value)
    }
  }

  onKeyDown_Space(e) {
    e.preventDefault()
    this.setState({ active : true })
  }

  onKeyUp_Space() {
    this.setState({ active : false })
  }
}
