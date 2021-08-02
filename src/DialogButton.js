import React from 'react'
import generateId from './generateId'
import { Button } from './Button'
import { DialogContext } from './Dialog'
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
    let dialog
    if(this.state.rendered) {
      const props = {
        id : this.dialogId,
        hidden : !this.state.expanded,
        anchor : this.domRef.current,
        onCancelEvent : this.props.onCancelEvent || this.onCancelEvent,
      }
      dialog = this.props.dialog?
        this.props.dialog(props) :
        <DialogContext.Provider value={ props }>{ this.props.children }</DialogContext.Provider>
    }
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
          ref={ this.setRendered }
        />
        { dialog }
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
