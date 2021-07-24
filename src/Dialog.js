import React from 'react'
import { Popup } from './Popup'
import './Dialog.css'

export class Dialog extends React.Component
{
  _ref = React.createRef()

  render() {
    return (
      <Popup
        modal={ this.props.modal }
        hidden={ this.props.hidden }
        anchor={ this.props.anchor }
        direction={ this.props.direction }
        onCancelEvent={ this.props.onCancelEvent }
      >
        <div
          className="Dialog"
          id={ this.props.id }
          role="dialog"
          aria-modal={ this.props.modal }
          aria-hidden={ this.props.hidden }
          onKeyDown={ this.onKeyDown }
          ref={ this._ref }
        >
          { this.props.children }
        </div>
      </Popup>
    )
  }

  componentDidMount() {
    this.setFocus()
  }

  componentDidUpdate() {
    this.setFocus()
  }

  setFocus() {
    if(this.props.hidden || !this.props.modal) {
      return
    }
    const node = this.node
    const autofocus = node.querySelector('[autofocus]')
    node.removeAttribute('tabindex')
    if(autofocus) {
      autofocus.focus()
      return
    }
    const nodes = this.getTabSequence()
    if(nodes[0]) {
      nodes[0].focus()
      return
    }
    node.tabIndex = -1
    node.focus()
  }

  getTabSequence(node = this.node) {
    const result = []
    for(const child of node.children) {
      if(getComputedStyle(child).display === 'none') {
        continue
      }
      if(child.isContentEditable && !child.hasAttribute('tabindex')) {
        result.push(child)
      }
      else if(child.tabIndex > -1) {
        if(child.disabled) {
          continue
        }
        if(child.tagName === 'INPUT' && child.type === 'hidden') {
          continue
        }
        if('href' in child && !child.href) {
          continue
        }
        result.push(child)
      }
      if(child.hasChildNodes()) {
        result.push(...this.getTabSequence(child))
      }
    }
    return result
  }

  onKeyDown = e => {
    const handler = this['onKeyDown_' + e.code]
    if(typeof handler === 'function') {
      handler.call(this, e)
    }
  }

  onKeyDown_Tab(e) {
    if(!this.props.modal) {
      return
    }
    const nodes = this.getTabSequence()
    if(!nodes.length) {
      e.preventDefault()
      return
    }
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if(e.shiftKey && e.target === first) {
      e.preventDefault()
      last.focus()
    }
    else if(!e.shiftKey && e.target === last) {
      e.preventDefault()
      first.focus()
    }
  }

  get node() {
    return this._ref.current
  }
}
