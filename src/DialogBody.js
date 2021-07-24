import React from 'react'
import './DialogBody.css'

export class DialogBody extends React.Component
{
  _ref = React.createRef()

  render() {
    return (
      <div
        className="DialogBody"
        onScroll={ this.onScroll }
        ref={ this._ref }
      >
        { this.props.children }
      </div>
    )
  }

  onScroll = () => {
    this._ref.current.classList.toggle('scrolled', !!this._ref.current.scrollTop)
  }
}
