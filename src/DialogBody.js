import React from 'react'
import './DialogBody.css'

export class DialogBody extends React.Component
{
  elem = React.createRef()

  render() {
    return (
      <div
        className="DialogBody"
        onScroll={ this.onScroll }
        ref={ this.elem }
      >
        { this.props.children }
      </div>
    )
  }

  onScroll = () => {
    this.elem.current.classList.toggle('scrolled', !!this.elem.current.scrollTop)
  }

  get node() {
    return this.elem.current
  }
}
