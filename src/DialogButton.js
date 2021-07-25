import React from 'react'
import generateId from './generateId'
import { Button } from './Button'
import './DialogButton.css'

export class DialogButton extends React.Component
{
  state = {
    expanded : false,
  }

  node = null

  setNode = node => this.node = node

  _dialogId = generateId()

  render() {
    return (
      <>
        <Button
          { ...this.props }
          classList={ [this.props.classList, 'DialogButton'] }
          controls={ this._dialogId }
          hasPopup="dialog"
          expanded={ this.state.expanded }
          onClick={ this.onClick }
          ref={ this.setNode }
        />
        {
          this.node && this.props.dialog({
            id : this._dialogId,
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
}
