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
    let hidden
    if(props.hidden === false && state.hidden === true) {
      hidden = false
    }
    if(props.hidden === false && state.hidden === false) {
      hidden = null
    }
    if(props.hidden === true && state.hidden === false) {
      hidden = true
    }
    return (
      <div
        className="Popup"
        aria-hidden={ hidden }
        ref={ this._ref }
      >
        { this.props.children }
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { props, state } = this
    if(props.hidden === true && state.hidden === true) {
      return
    }
    if(props.hidden === false && state.hidden === true) {
      document.addEventListener('click', this.onDocClick)
      setTimeout(() => this.setState({ hidden : false }))
      return
    }
    if(props.hidden === false && state.hidden === false) {
      return
    }
    if(props.hidden === true && state.hidden === false) {
      document.removeEventListener('click', this.onDocClick)
      this._ref.current.ontransitionend = () => {
        this._ref.current.ontransitionend = null
        this.setState({ hidden : true })
      }
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
