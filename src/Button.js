import React from 'react'
import { Control } from './Control'
import './Button.css'

export class Button extends React.Component
{
  state = { active : false }

  render() {
    return (
      <div
        role="button"
        className={ ['Button Widget', this.state.active && 'active'].filter(Boolean).join(' ') }
        aria-pressed={ this.props.pressed }
        aria-disabled={ this.props.disabled }
        tabIndex={ this.props.disabled? null : 0 }
        onMouseDown={ this.onMouseDown }
        onMouseLeave={ this.onMouseLeave }
        onMouseUp={ this.onMouseUp }
      >
        <Control>
          { this.props.children }
        </Control>
      </div>
    )
  }

  onMouseDown = () => {
    if(this.props.disabled) {
      return
    }
    this.setState({ active : true })
  }

  onMouseLeave = () => {
    if(this.state.active) {
      this.setState({ active : false })
    }
  }

  onMouseUp = () => {
    if(this.state.active) {
      this.setState({ active : false })
    }
  }
}
