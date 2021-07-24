import React from 'react'
import { Control } from './Control'
import { Label } from './Label'
import './CheckBox.css'

export class CheckBox extends React.Component
{
  state = {
    active : false,
    checked : this.props.defaultChecked || false,
  }

  _ref = React.createRef()

  render() {
    return (
      <div
        className={ ['CheckBox Widget', this.state.active && 'active'].filter(Boolean).join(' ') }
        tabIndex={ this.props.disabled? null : 0 }
        role="checkbox"
        aria-checked={ this.props.checked ?? this.state.checked }
        aria-disabled={ this.props.disabled }
        onBlur={ this.onBlur }
        onClick={ this.onClick }
        onMouseDown={ this.onMouseDown }
        onMouseLeave={ this.onMouseLeave }
        onMouseUp={ this.onMouseUp }
        onKeyDown={ this.onKeyDown }
        onKeyUp={ this.onKeyUp }
        ref={ this._ref }
      >
        <Control/>
        { this.props.label && <Label>{ this.props.label }</Label> }
      </div>
    )
  }

  activate() {
    if(this.state.checked !== undefined) {
      this.setState(state => ({ checked : !state.checked }))
    }
  }

  onBlur = () => {
    this.state.active && this.setState({ active : false })
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
    this._ref.current.click()
  }
}
