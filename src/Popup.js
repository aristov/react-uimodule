import debounce from 'lodash/debounce'
import React from 'react'
import './Popup.css'

const POSITION_UPDATE_DEBOUNCE = 200
const POSITION_UPDATE_INTERVAL = 1000

export class Popup extends React.Component
{
  _ref = React.createRef()

  _position = [null, null]

  _timeoutId = null

  state = {
    hidden : true,
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
        onKeyDown={ this.onKeyDown }
        ref={ this._ref }
      >
        <div className="Inner">{ props.children }</div>
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
    this.updatePosition()
    setTimeout(() => this.setState({ hidden : false }))
    document.addEventListener('click', this.onDocClick)
    document.addEventListener('focusin', this.onDocFocusIn)
    document.addEventListener('scroll', this.onDocScroll, true)
    window.addEventListener('resize', this.onWinResize)
  }

  close() {
    const handler = this.node.ontransitionend = () => {
      clearTimeout(timeoutId)
      this.node.ontransitionend = null
      this.setState({ hidden : true })
    }
    const timeoutId = setTimeout(handler, Math.max(...this.durations))
    if(this.node.contains(document.activeElement)) {
      this.props.anchor?.node.focus()
    }
    this.removeHandlers()
  }

  componentWillUnmount() {
    this.removeHandlers()
  }

  removeHandlers() {
    if(this._timeoutId) {
      clearTimeout(this._timeoutId)
      this._timeoutId = null
    }
    document.removeEventListener('click', this.onDocClick)
    document.removeEventListener('focusin', this.onDocFocusIn)
    document.removeEventListener('scroll', this.onDocScroll, true)
    window.removeEventListener('resize', this.onWinResize)
  }

  updatePosition = () => {
    const direction = this.direction
    if(direction === 'none' || !this.props.anchor || this.props.modal || this.hidden) {
      return this.setPosition(this._position = [null, null])
    }
    const aRect = this.props.anchor.node.getBoundingClientRect()
    const pRect = this.node.getBoundingClientRect()
    const { alternatives, fallback } = directions[direction]
    let item, position
    if(!this._timeoutId) {
      this._timeoutId = setTimeout(() => this.updatePosition(), POSITION_UPDATE_INTERVAL)
    }
    for(item of [direction, ...alternatives]) {
      position = directions[item].handler(aRect, pRect)
      if(position) {
        this.setPosition(position)
        this._position = [aRect.top, aRect.left]
        return
      }
    }
    this.setPosition(fallback())
    this._position = [aRect.top, aRect.left]
  }

  updatePositionDebounce = debounce(this.updatePosition, POSITION_UPDATE_DEBOUNCE)

  /**
   * @param {array} position
   */
  setPosition([top, left]) {
    const style = this.node.style
    const rect = this.node.getBoundingClientRect()
    style.transition = null
    style.top = top === null?
      null :
      Math.min(Math.max(top, 0), window.innerHeight - rect.height) + 'px'
    style.left = left === null?
      null :
      Math.min(Math.max(left, 0), window.innerWidth - rect.width) + 'px'
  }

  onKeyDown = e => {
    if(e.code === 'Escape') {
      e.stopPropagation()
      this.props.onCancelEvent?.(e)
    }
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
    this.props.onCancelEvent?.(e)
  }

  onDocFocusIn = e => {
    if(this.node.contains(e.target) || this.props.anchor?.node.contains(e.target)) {
      return
    }
    const popup = e.target.closest('.Popup')
    if(popup && popup.classList.contains('modal') && !popup.contains(this.node)) {
      return
    }
    this.props.onCancelEvent?.(e)
  }

  onDocScroll = e => {
    if(!this.props.anchor || this.props.modal || this.hidden) {
      return
    }
    if(this.direction === 'none' || !e.target.contains(this.node)) {
      return
    }
    const style = this.node.style
    const popup = this.node.getBoundingClientRect()
    const anchor = this.props.anchor.node.getBoundingClientRect()
    const [top, left] = this._position
    clearTimeout(this._timeoutId)
    style.transition = 'none'
    style.top = popup.top + anchor.top - top + 'px'
    style.left = popup.left + anchor.left - left + 'px'
    this._position = [anchor.top, anchor.left]
    this.updatePositionDebounce()
  }

  onWinResize = () => {
    this.updatePositionDebounce()
  }

  /**
   * @return {string}
   */
  get direction() {
    return this.props.direction || 'bottom-right'
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

  get hidden() {
    return this.props.hidden && this.state.hidden
  }

  get node() {
    return this._ref.current
  }
}

const directions = {
  'top-left' : {
    handler : (anchor, popup) => {
      if(anchor.top - popup.height > 0) {
        return [anchor.top - popup.height, anchor.right - popup.width]
      }
    },
    fallback : () => [0, 0],
    alternatives : ['bottom-left', 'left-top', 'right-top'],
  },
  'top-right' : {
    handler : (anchor, popup) => {
      if(anchor.top - popup.height > 0) {
        return [anchor.top - popup.height, anchor.left]
      }
    },
    fallback : () => [0, window.innerWidth],
    alternatives : ['bottom-right', 'right-top', 'left-top'],
  },
  'right-top' : {
    handler : (anchor, popup) => {
      if(anchor.right + popup.width < window.innerWidth) {
        return [anchor.bottom - popup.height, anchor.right]
      }
    },
    fallback : () => [0, window.innerWidth],
    alternatives : ['left-top', 'top-right', 'bottom-right'],
  },
  'right-bottom' : {
    handler : (anchor, popup) => {
      if(anchor.right + popup.width < window.innerWidth) {
        return [anchor.top, anchor.right]
      }
    },
    fallback : () => [window.innerHeight, window.innerWidth],
    alternatives : ['left-bottom', 'bottom-right', 'top-right'],
  },
  'bottom-right' : {
    handler : (anchor, popup) => {
      if(anchor.bottom + popup.height < window.innerHeight) {
        return [anchor.bottom, anchor.left]
      }
    },
    fallback : () => [window.innerHeight, window.innerWidth],
    alternatives : ['top-right', 'right-bottom', 'left-bottom'],
  },
  'bottom-left' : {
    handler : (anchor, popup) => {
      if(anchor.bottom + popup.height < window.innerHeight) {
        return [anchor.bottom, anchor.right - popup.width]
      }
    },
    fallback : () => [window.innerHeight, 0],
    alternatives : ['top-left', 'left-bottom', 'right-bottom'],
  },
  'left-bottom' : {
    handler : (anchor, popup) => {
      if(anchor.left - popup.width > 0) {
        return [anchor.top, anchor.left - popup.width]
      }
    },
    fallback : () => [window.innerHeight, 0],
    alternatives : ['right-bottom', 'bottom-left', 'top-left'],
  },
  'left-top' : {
    handler : (anchor, popup) => {
      if(anchor.left - popup.width > 0) {
        return [anchor.bottom - popup.height, anchor.left - popup.width]
      }
    },
    fallback : () => [0, 0],
    alternatives : ['right-top', 'top-left', 'bottom-left'],
  },
}
