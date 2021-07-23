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
    setTimeout(() => this.setState({ hidden : false }))
    document.addEventListener('click', this.onDocClick)
  }

  close() {
    const handler = this.node.ontransitionend = () => {
      clearTimeout(timeoutId)
      this.node.ontransitionend = null
      this.setState({ hidden : true })
    }
    const timeoutId = setTimeout(handler, Math.max(...this.durations))
    document.removeEventListener('click', this.onDocClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocClick)
  }

  onDocClick = e => {
    if(this.props.hidden && this.state.hidden) {
      return
    }
    if(this.node.contains(e.target)) {
      return
    }
    if(this.props.anchor?.node.contains(e.target)) {
      return
    }
    this.props.onClickOutside?.(e)
  }

  /**
   * @returns {number[]}
   */
  get durations() {
    if(this.props.hidden && this.state.hidden) {
      return [0]
    }
    const style = getComputedStyle(this.node)
    const durations = style.transitionDuration.split(', ')
    return durations.map(duration => parseFloat(duration) * 1000)
  }

  get node() {
    return this._ref.current
  }
}
