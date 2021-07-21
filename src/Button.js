import React from 'react'
import { Control } from './Control'
import './Button.css'

export class Button extends React.Component
{
  render() {
    return (
      <div
        role="button"
        className="Button Widget"
        aria-pressed={ this.props.pressed }
        aria-disabled={ this.props.disabled }
        tabIndex={ this.props.disabled? null : 0 }
      >
        <Control>
          { this.props.children }
        </Control>
      </div>
    )
  }
}
