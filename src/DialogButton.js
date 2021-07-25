import React from 'react'
import generateId from './generateId'
import { Button } from './Button'
import './DialogButton.css'

export class DialogButton extends React.Component
{
  state = {
    rendered : false,
    expanded : false,
  }

  elem = React.createRef()

  getElem = current => {
    this.elem.current = current
    this.state.rendered || this.setState({ rendered : true })
  }

  dialogId = generateId()

  render() {
    return (
      <>
        <Button
          { ...this.props }
          classList={ [this.props.classList, 'DialogButton'] }
          controls={ this.dialogId }
          hasPopup="dialog"
          expanded={ this.state.expanded }
          onClick={ this.onClick }
          ref={ this.getElem }
        />
        {
          this.state.rendered && this.props.dialog({
            id : this.dialogId,
            hidden : !this.state.expanded,
            anchor : this.node,
            onCancelEvent : this.props.onCancelEvent || this.onCancelEvent
          })
        }
      </>
    )
  }

  onClick = () => {
    this.setState(state => ({ expanded : !state.expanded }))
  }

  onCancelEvent = () => {
    this.setState({ expanded : false })
  }

  get node() {
    return this.elem.current?.node
  }
}
