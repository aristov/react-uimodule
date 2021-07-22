import { Component } from 'react'
import { Control } from './Control'
import { Label } from './Label'
import './Radio.css'

export class Radio extends Component
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
        role="radio"
        className={ classList.filter(Boolean).join(' ') }
        aria-checked={ this.props.checked }
        aria-disabled={ this.props.disabled }
        onClick={ this.onClick }
        onMouseDown={ this.onMouseDown }
        onMouseLeave={ this.onMouseLeave }
        onMouseUp={ this.onMouseUp }
      >
        <Control/>
        <Label>{ this.props.children }</Label>
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
