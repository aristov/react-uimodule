import React from 'react'
import { Label } from './Label'
import { Control } from './Control'
import { Popup } from './Popup'
import { ListBox } from './ListBox'
import './SelectBox.css'

export class SelectBox extends React.Component
{
  state = {
    active : false,
    expanded : false,
    value : this.props.defaultValue || null,
  }

  _popupId = generateId()

  _ref = React.createRef()

  _listBox = React.createRef()

  render() {
    const classList = ['SelectBox Widget', this.state.active && 'active']
    const value = this.props.value ?? this.state.value
    const option = value && this.props.options.find(option => option.value === value)
    return (
      <>
        <div
          role="combobox"
          className={ classList.filter(Boolean).join(' ') }
          tabIndex={ this.props.disabled? null : 0 }
          aria-haspopup="listbox"
          aria-controls={ this._popupId }
          aria-expanded={ this.state.expanded }
          aria-required={ this.props.required }
          aria-disabled={ this.props.disabled }
          onClick={ this.onClick }
          onKeyDown={ this.onKeyDown }
          onKeyUp={ this.onKeyUp }
          ref={ this._ref }
        >
          { this.props.label && <Label>{ this.props.label }</Label> }
          <Control>
            <div className="Inner">{ option?.text || ' ' }</div>
          </Control>
        </div>
        <Popup
          hidden={ !this.state.expanded }
          anchor={ this }
          onCancelEvent={ this.activate }
          id={ this._popupId }
        >
          <ListBox
            options={ this.props.options }
            tabIndex={ null }
            onClick={ this.onListBoxClick }
            onChange={ this.onListBoxChange }
            value={ value }
            ref={ this._listBox }
          />
        </Popup>
      </>
    )
  }

  activate = () => {
    this.setState(state => ({ expanded : !state.expanded }))
  }

  onClick = e => {
    if(this.props.disabled) {
      e.preventDefault()
      e.nativeEvent.stopImmediatePropagation()
    }
    e.defaultPrevented || this.activate()
  }

  onKeyDown = e => {
    const handler = this['onKeyDown_' + e.code]
    if(typeof handler === 'function') {
      handler.call(this, e)
    }
    if(!['ArrowUp', 'ArrowDown'].includes(e.code)) {
      return
    }
    if(this.state.expanded) {
      this._listBox.current.onKeyDown(e)
      return
    }
    e.preventDefault()
    this.setState({ expanded : true })
  }

  onKeyDown_Backspace() {
    if(this.props.required) {
      return
    }
    if(!this.props.value && !this.state.value) {
      return
    }
    this.setState({ value : null })
    this.props.onChange?.(null)
  }

  onKeyDown_Enter(e) {
    e.stopPropagation()
    this.activate()
  }

  onKeyDown_Escape(e) {
    if(this.state.expanded) {
      e.stopPropagation()
      this.setState({ expanded : false })
    }
  }

  onKeyDown_Space(e) {
    e.preventDefault()
    if(!e.repeat) {
      this.setState({ active : true })
    }
  }

  onKeyUp = e => {
    const handler = this['onKeyUp_' + e.code]
    if(typeof handler === 'function') {
      handler.call(this, e)
    }
  }

  onKeyUp_Space() {
    this.setState({ active : false })
    this.node.click()
  }

  onListBoxChange = value => {
    if(typeof this.props.value === 'undefined') {
      this.setState({ value })
    }
    this.props.onChange?.(value)
  }

  onListBoxClick = e => {
    e.stopPropagation()
    this.node.focus()
    if(this.props.multiSelectable) { // todo
      return
    }
    if(this.props.checkable && !this.props.required) { // todo
      return
    }
    this.setState({ expanded : false })
  }

  get node() {
    return this._ref.current
  }
}

let counter = 0

function generateId() { // fixme: 1, 3, 5, 7, ...
  let id, str
  do {
    str = (counter++).toString(36)
    id = 'ID_' + '0'.repeat(Math.max(0, 7 - str.length)) + str
  }
  while(document.getElementById(id))
  return id
}
