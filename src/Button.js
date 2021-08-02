import React from 'react'
import { Control } from './Control'
import './Button.css'

export class Button extends React.Component
{
  state = {
    active : false,
    pressed : this.props.defaultPressed,
  }

  domRef = this.props.domRef || React.createRef()

  render() {
    const tabIndex = this.props.disabled? null : this.props.tabIndex
    const classList = [
      this.props.classList,
      'Button Widget',
      this.state.active && 'active',
    ]
    return (
      <div
        className={ classList.flat(Infinity).filter(Boolean).join(' ') }
        tabIndex={ typeof tabIndex === 'undefined'? 0 : tabIndex }
        title={ this.props.title }
        role="button"
        aria-pressed={ this.props.pressed ?? this.state.pressed }
        aria-disabled={ this.props.disabled }
        aria-controls={ this.props.controls }
        aria-haspopup={ this.props.hasPopup }
        aria-expanded={ this.props.expanded }
        onBlur={ this.onBlur }
        onClick={ this.onClick }
        onMouseDown={ this.onMouseDown }
        onMouseLeave={ this.onMouseLeave }
        onMouseUp={ this.onMouseUp }
        onKeyDown={ this.onKeyDown }
        onKeyUp={ this.onKeyUp }
        ref={ this.domRef }
      >
        <Control>
          { this.props.label || this.props.children }
        </Control>
      </div>
    )
  }

  activate() {
    if(this.state.pressed !== undefined) {
      this.setState(state => ({ pressed : !state.pressed }))
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
    this.domRef.current.click()
  }

  get node() {
    return this.domRef.current
  }
}
