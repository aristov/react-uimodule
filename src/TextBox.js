import React from 'react'
import { Label } from './Label'
import { Control } from './Control'
import './TextBox.css'

export class TextBox extends React.Component
{
  state = {
    value : this.props.defaultValue || ''
  }

  _ref = React.createRef()
  _edit = React.createRef()

  render() {
    return (
      <div
        className="TextBox Widget"
        tabIndex={ this.props.disabled? null : -1 }
        aria-disabled={ this.props.disabled }
        onFocus={ this.onFocus }
        ref={ this._ref }
      >
        { this.props.label && <Label>{ this.props.label }</Label> }
        <Control>
          <div
            role="textbox"
            className="Edit"
            tabIndex={ this.props.disabled? null : 0 }
            aria-disabled={ this.props.disabled }
            contentEditable={ !this.props.disabled }
            onInput={ this.onInput }
            onKeyDown={ this.onKeyDown }
            onPaste={ this.onPaste }
            ref={ this._edit }
          />
        </Control>
      </div>
    )
  }

  componentDidMount() {
    this._edit.current.textContent = this.props.value ?? this.state.value
    this._ref.current.addEventListener('change', this.onChange)
  }

  componentDidUpdate() {
    if(typeof this.props.value === 'undefined') {
      return
    }
    const node = this._edit.current
    node.textContent = this.props.value
    if(this.props.onChange || !node.firstChild || node !== document.activeElement) {
      return
    }
    const selection = getSelection()
    selection.collapse(node.firstChild, this._anchorOffset)
    selection.extend(node.firstChild, this._focusOffset)
  }

  componentWillUnmount() {
    this._ref.current.removeEventListener('change', this.onChange)
  }

  onFocus = () => {
    this._edit.current.focus()
  }

  onInput = e => {
    this.setState({ value : e.target.textContent })
    this._ref.current.dispatchEvent(new Event('change', { bubbles : true }))
  }

  onChange = e => {
    e.target.value = this._edit.current.textContent
    this.props.onChange?.(e)
  }

  onKeyDown = e => {
    const handler = this['onKeyDown_' + e.code]
    if(typeof handler === 'function') {
      handler.call(this, e)
    }
    const selection = getSelection()
    this._anchorOffset = selection.anchorOffset
    this._focusOffset = selection.focusOffset
  }

  onKeyUp = e => {
    const handler = this['onKeyUp_' + e.code]
    if(typeof handler === 'function') {
      handler.call(this, e)
    }
  }

  onKeyDown_Enter(e) {
    if(!this.props.multiLine) {
      e.preventDefault()
    }
  }

  onPaste = e => {
    e.preventDefault()
    if(this.props.readOnly) {
      return
    }
    const data = e.clipboardData.getData('text')
    const node = this._edit.current
    const text = node.textContent
    const selection = getSelection()
    const startOffset = Math.min(selection.anchorOffset, selection.focusOffset)
    const endOffset = Math.max(selection.anchorOffset, selection.focusOffset)
    const beforeText = text.slice(0, startOffset)
    const afterText = text.slice(endOffset, text.length)
    node.textContent = beforeText + data + afterText
    selection.collapse(node.firstChild, beforeText.length + data.length)
    node.dispatchEvent(new InputEvent('input', { bubbles : true }))
  }
}
