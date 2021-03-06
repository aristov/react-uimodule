import React from 'react'
import './Option.css'

export class Option extends React.Component
{
  state = {
    active : false,
  }

  domRef = React.createRef()

  render() {
    return (
      <div
        className={ ['Option Widget', this.state.active && 'active'].filter(Boolean).join(' ') }
        role="option"
        aria-selected={ this.props.selected }
        aria-disabled={ this.props.disabled }
        onClick={ this.onClick }
        onMouseDown={ this.onMouseDown }
        onMouseLeave={ this.onMouseLeave }
        onMouseUp={ this.onMouseUp }
        ref={ this.domRef }
      >
        { this.props.label || this.props.children }
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

  get node() {
    return this.domRef.current
  }
}
