import React from 'react'
import generateId from './generateId'
import { Popup } from './Popup'
import { DialogHead } from './DialogHead'
import { DialogBody } from './DialogBody'
import { Heading } from './Heading'
import { CancelButton } from './CancelButton'
import './Dialog.css'

export const DialogContext = React.createContext(null)

export class Dialog extends React.Component
{
  static contextType = DialogContext

  domRef = React.createRef()

  headingId = this.props.title && generateId()

  modal = false

  hidden = true

  render() {
    const props = this.context? Object.assign(this.context, this.props) : this.props
    this.modal = props.modal
    this.hidden = props.hidden
    return (
      <Popup
        modal={ props.modal }
        hidden={ props.hidden }
        anchor={ props.anchor }
        direction={ props.direction }
        onCancelEvent={ props.onCancelEvent }
      >
        <div
          className="Dialog"
          id={ props.id }
          role="dialog"
          aria-modal={ props.modal }
          aria-hidden={ props.hidden }
          aria-labelledby={ this.headingId }
          onKeyDown={ this.onKeyDown }
          ref={ this.domRef }
        >{
          !props.title? props.children : (<>
            <DialogHead>
              <Heading id={ this.headingId }>{ props.title }</Heading>
              <CancelButton/>
            </DialogHead>
            <DialogBody>
              { props.children }
            </DialogBody>
          </>)
        }</div>
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
    if(this.hidden || !this.modal) {
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
    if(!this.modal) {
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
    return this.domRef.current
  }
}
