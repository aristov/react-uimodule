import React from 'react'
import './Popup.css'

export class Popup extends React.Component
{
  _ref = React.createRef()

  render() {
    return (
      <div
        className="Popup"
        hidden={ this.props.hidden }
        ref={ this._ref }
      >
        { this.props.children }
      </div>
    )
  }

  componentDidMount() {
    document.addEventListener('click', this.onDocClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocClick)
  }

  onDocClick = e => {
    if(this.props.hidden) {
      return
    }
    if(this._ref.current.contains(e.target)) {
      return
    }
    if(this.props.anchor._ref.current.contains(e.target)) {
      return
    }
    this.props.onClickOutside?.(e)
  }
}
