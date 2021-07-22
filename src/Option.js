import { Component } from 'react'
import './Option.css'

export class Option extends Component
{
  state = {
    active : false,
  }

  render() {
    return (
      <div
        role="option"
        className={ ['Option Widget', this.state.active && 'active'].filter(Boolean).join(' ') }
        aria-selected={ this.props.selected }
        aria-disabled={ this.props.disabled }
        onClick={ this.onClick }
        onMouseDown={ this.onMouseDown }
        onMouseLeave={ this.onMouseLeave }
        onMouseUp={ this.onMouseUp }
      >
        { this.props.children }
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
