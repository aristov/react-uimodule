import React from 'react'
import generateId from './generateId'
import { Button } from './Button'
import './DialogButton.css'

export class DialogButton extends React.Component
{
  state = {
    expanded : false,
    anchor : null,
  }

  setAnchor = anchor => this.state.anchor || this.setState({ anchor })

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
          ref={ this.setAnchor }
        />
        {
          this.state.anchor && this.props.dialog({
            id : this._dialogId,
            hidden : !this.state.expanded,
            anchor : this.state.anchor,
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
