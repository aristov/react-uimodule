import React from 'react'
import { Control } from './Control'
import { Label } from './Label'
import './Radio.css'

export class Radio extends React.Component
{
  state = {
    active : false,
  }

  render() {
    const classList = [
      'Radio Widget',
      this.state.active && 'active',
      this.props.focus && 'focus',
    ]
    return (
      <div
        className={ classList.filter(Boolean).join(' ') }
        role="radio"
        aria-checked={ this.props.checked }
        aria-disabled={ this.props.disabled }
        onClick={ this.onClick }
        onMouseDown={ this.onMouseDown }
        onMouseLeave={ this.onMouseLeave }
        onMouseUp={ this.onMouseUp }
      >
        <Control/>
        { this.props.label && <Label>{ this.props.label }</Label> }
      </div>
    )
  }

  onClick = () => {
    this.props.updateValue(this.props.value)
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
}
