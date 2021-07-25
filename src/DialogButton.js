import React from 'react'
import generateId from './generateId'
import { Button } from './Button'
import './DialogButton.css'

export class DialogButton extends React.Component
{
  state = {
    expanded : false,
  }

  _ref = React.createRef()

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
          ref={ this._ref }
        />
        {
          this.props.dialog({
            id : this._dialogId,
            hidden : !this.state.expanded,
            anchor : this._ref.current,
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
