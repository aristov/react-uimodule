import React from 'react'
import './Popup.css'

/**
 *
 * props.hidden === true && state.hidden === true
 * => render = false
 *
 *
 *
 * props.hidden === false && state.hidden === true
 * => render = true
 * => aria-hidden = false
 *
 * show() => state.hidden = false
 *
 * props.hidden === false && state.hidden === false
 * => render = true
 * => aria-hidden = null
 *
 *
 *
 * props.hidden === true && state.hidden === false
 * => render = true
 * => aria-hidden = true
 *
 * close() => state.hidden = true
 *
 * props.hidden === true && state.hidden === true
 * => render = false
 *
 */

export class Popup extends React.Component
{
  _ref = React.createRef()

  state = {
    hidden : true
  }

  render() {
    const { props, state } = this
    if(props.hidden && state.hidden) {
      return null
    }
    return (
      <div
        className="Popup"
        aria-hidden={ !props.hidden && !state.hidden? null : props.hidden }
        ref={ this._ref }
      >
        { props.children }
      </div>
    )
  }

  componentDidUpdate() {
    if(this.state.hidden) {
      this.props.hidden || this.show()
    }
    else this.props.hidden && this.close()
  }

  show() {
    document.addEventListener('click', this.onDocClick)
    setTimeout(() => this.setState({ hidden : false }))
  }

  close() {
    document.removeEventListener('click', this.onDocClick)
    this._ref.current.ontransitionend = () => {
      this._ref.current.ontransitionend = null
      this.setState({ hidden : true })
    }
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
