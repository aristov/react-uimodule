import React from 'react'
import { Control } from './Control'
import './Button.css'

export class Button extends React.Component
{
  state = {
    active : false,
    pressed : this.props.defaultPressed,
  }

  _button = React.createRef()

  render() {
    return (
      <div
        role="button"
        className={ ['Button Widget', this.state.active && 'active'].filter(Boolean).join(' ') }
        aria-pressed={ this.props.pressed ?? this.state.pressed }
        aria-disabled={ this.props.disabled }
        tabIndex={ this.props.disabled? null : 0 }
        onClick={ this.onClick }
        onMouseDown={ this.onMouseDown }
        onMouseLeave={ this.onMouseLeave }
        onMouseUp={ this.onMouseUp }
        onKeyDown={ this.onKeyDown }
        onKeyUp={ this.onKeyUp }
        ref={ this._button }
      >
        <Control>
          { this.props.children }
        </Control>
      </div>
    )
  }

  activate() {
    if(this.state.pressed !== undefined) {
      this.setState(state => ({ pressed : !state.pressed }))
    }
  }

  onClick = e => {
    this.props.onClick?.(e)
    if(this.props.disabled) {
      e.preventDefault()
      e.nativeEvent.stopImmediatePropagation()
    }
    e.defaultPrevented || this.activate()
  }

  onMouseDown = () => {
    if(!this.props.disabled) {
      this.setState({ active : true })
    }
  }

  onMouseLeave = () => {
    if(!this.props.disabled && this.state.active) {
      this.setState({ active : false })
    }
  }

  onMouseUp = () => {
    if(!this.props.disabled && this.state.active) {
      this.setState({ active : false })
    }
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

  onKeyDown_Space(e) {
    e.preventDefault()
    this.setState({ active : true })
  }

  onKeyUp_Space() {
    this.setState({ active : false })
    this._button.current.click()
  }
}
