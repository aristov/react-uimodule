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

  domRef = this.props.domRef || React.createRef()

  setRendered = button => {
    !!button === this.state.rendered || this.setState({ rendered : !!button })
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
          domRef={ this.domRef }
          ref ={ this.setRendered }
        />
        {
          this.state.rendered && this.props.dialog({
            id : this.dialogId,
            hidden : !this.state.expanded,
            anchor : this.domRef.current,
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
    return this.domRef.current
  }
}
