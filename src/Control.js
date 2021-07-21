import React from 'react'
import './Control.css'

export class Control extends React.Component
{
  render() {
    return (
      <div className="Control">
        { this.props.children }
      </div>
    )
  }
}
