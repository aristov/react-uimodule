import React from 'react'
import { Control } from './Control'
import { Label } from './Label'
import { Option } from './Option'
import './ListBox.css'

export class ListBox extends React.Component
{
  state = {
    active : false,
    value : this.props.defaultValue || null,
  }

  elem = React.createRef()

  render() {
    const value = this.props.value ?? this.state.value
    const tabIndex = this.props.disabled? null : this.props.tabIndex
    return (
      <div
        className={ ['ListBox Widget', this.state.active && 'active'].filter(Boolean).join(' ') }
        id={ this.props.id }
        tabIndex={ typeof tabIndex === 'undefined'? 0 : tabIndex }
        role="listbox"
        aria-disabled={ this.props.disabled }
        onClick={ this.onClick }
        onKeyDown={ this.onKeyDown }
        onKeyUp={ this.onKeyUp }
        ref={ this.elem }
      >
        { this.props.label && <Label>{ this.props.label }</Label> }
        <Control>{
          this.props.options.map(option => {
            return (
              <Option
                label={ option.label || option.value }
                key={ option.value || option.label }
                value={ option.value || option.label }
                selected={ option.value === value }
                disabled={ this.props.disabled }
                updateValue={ this.updateValue }
              />
            )
          })
        }</Control>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const value = this.props.value
    if(typeof value === 'undefined') {
      return
    }
    if(this.state.value === value) {
      return
    }
    this.setState({ value })
  }

  updateValue = value => {
    if(this.props.disabled) {
      return
    }
    this.setState({ value })
    this.props.onChange?.(value)
  }

  onClick = e => {
    this.props.onClick?.(e)
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
    const value = this.props.value || this.state.value
    const options = this.props.options
    let index = value?
      options.findIndex(option => option.value === value) :
      options.length
    if(--index > -1) {
      this.updateValue(options[index].value)
    }
  }

  onKeyDown_ArrowDown(e) {
    e.preventDefault()
    const value = this.props.value || this.state.value
    const options = this.props.options
    let index = options.findIndex(option => option.value === value)
    if(++index < options.length) {
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

  get node() {
    return this.elem.current
  }
}
