import React from 'react'
import './DialogBody.css'

export class DialogBody extends React.Component
{
  domRef = React.createRef()

  render() {
    return (
      <div
        className="DialogBody"
        onScroll={ this.onScroll }
        ref={ this.domRef }
      >
        { this.props.children }
      </div>
    )
  }

  onScroll = () => {
    this.domRef.current.classList.toggle('scrolled', !!this.domRef.current.scrollTop)
  }

  get node() {
    return this.domRef.current
  }
}
