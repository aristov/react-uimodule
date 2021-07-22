import { Component } from 'react'
import { Control } from './Control'
import { Option } from './Option'
import { Label } from './Label'
import './ListBox.css'

export class ListBox extends Component
{
  state = {
    active : false,
    value : this.props.defaultValue,
  }

  render() {
    return (
      <div
        role="listbox"
        className={ ['ListBox Widget', this.state.active && 'active'].filter(Boolean).join(' ') }
        tabIndex={ this.props.disabled? null : 0 }
        aria-disabled={ this.props.disabled }
        onKeyDown={ this.onKeyDown }
        onKeyUp={ this.onKeyUp }
      >
        {
          this.props.label && <Label>{ this.props.label }</Label>
        }
        <Control>{
          this.props.options.map(option => {
            return (
              <Option key={ option.value || option.text } { ...option }
                      selected={ option.value === this.state.value }
                      disabled={ this.props.disabled }
                      updateValue={ this.updateValue }
              />
            )
          })
        }</Control>
      </div>
    )
  }

  updateValue = value => {
    if(this.props.disabled) {
      return
    }
    this.setState({ value })
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
    const value = this.state.value
    const options = this.props.options
    const index = options.findIndex(option => option.value === value) - 1
    if(index > -1) {
      this.setState({ value : options[index].value })
    }
  }

  onKeyDown_ArrowDown(e) {
    e.preventDefault()
    const value = this.state.value
    const options = this.props.options
    const index = options.findIndex(option => option.value === value) + 1
    if(index < options.length) {
      this.setState({ value : options[index].value })
    }
  }

  onKeyDown_Space(e) {
    e.preventDefault()
    this.setState({ active : true })
  }

  onKeyUp_Space() {
    this.setState({ active : false })
  }
}
