import React from 'react'
import ReactDOM from 'react-dom'
import debounce from 'lodash/debounce'
import './Popup.css'

const POSITION_UPDATE_DEBOUNCE = 200
const POSITION_UPDATE_INTERVAL = 500

export const CancelContext = React.createContext(() => {})

export class Popup extends React.Component
{
  _ref = React.createRef()

  _position = [null, null]

  _positionTimeoutId = null

  state = {
    hidden : true,
  }

  render() {
    const { props, state } = this
    if(props.hidden && state.hidden) {
      return null
    }
    const layout = (
      <div
        className={ ['Popup', props.modal && 'modal'].filter(Boolean).join(' ') }
        aria-hidden={ !props.hidden && !state.hidden? null : props.hidden }
        onKeyDown={ this.onKeyDown }
        ref={ this._ref }
      >
        <div className="PopupContent">
          <CancelContext.Provider value={ this.props.onCancelEvent }>
            { props.children }
          </CancelContext.Provider>
        </div>
      </div>
    )
    return props.modal? ReactDOM.createPortal(layout, document.body) : layout
  }

  componentDidUpdate() {
    if(this.state.hidden) {
      this.props.hidden || this.show()
    }
    else this.props.hidden && this.close()
  }

  show() {
    this.updatePosition()
    setImmediate(() => this.setState({ hidden : false }, this.setHandlers))
  }

  close() {
    const node = this.node
    const handler = node.ontransitionend = () => {
      if(!this.node) {
        return
      }
      clearTimeout(timeoutId)
      node.ontransitionend = null
      this.setState({ hidden : true })
    }
    const timeoutId = setTimeout(handler, Math.max(...this.durations))
    this.clearHandlers()
    if(this.props.modal || node.contains(document.activeElement)) {
      this.props.anchor?.node?.focus()
    }
  }

  componentWillUnmount() {
    this.clearHandlers()
  }

  setHandlers = () => {
    document.addEventListener('click', this.onDocClick)
    document.addEventListener('focusin', this.onDocFocusIn)
    document.addEventListener('keydown', this.onDocKeyDown, true)
    if(this.props.modal) {
      return
    }
    document.addEventListener('scroll', this.onDocScroll, true)
    window.addEventListener('resize', this.onWinResize)
    this.setPositionTimeout()
  }

  clearHandlers = () => {
    document.removeEventListener('click', this.onDocClick)
    document.removeEventListener('focusin', this.onDocFocusIn)
    document.removeEventListener('keydown', this.onDocKeyDown)
    if(this.props.modal) {
      return
    }
    document.removeEventListener('scroll', this.onDocScroll, true)
    window.removeEventListener('resize', this.onWinResize)
    this.clearPositionTimeout()
  }

  setPositionTimeout = () => {
    this._positionTimeoutId = setTimeout(() => {
      this.updatePosition()
      this.setPositionTimeout()
    }, POSITION_UPDATE_INTERVAL)
  }

  clearPositionTimeout = () => {
    clearTimeout(this._positionTimeoutId)
    this._positionTimeoutId = null
  }

  updatePosition = () => {
    if(this.props.hidden || !this.props.anchor) {
      return
    }
    const direction = this.direction
    if(direction === 'none') {
      return this.setPosition(this._position = [null, null])
    }
    const pRect = this.node.getBoundingClientRect()
    const aRect = this.props.anchor.node.getBoundingClientRect()
    const { alternatives, fallback } = directions[direction]
    let item, position
    for(item of [direction, ...alternatives]) {
      position = directions[item].handler(aRect, pRect)
      if(position) {
        break
      }
    }
    this.setPosition(position || fallback())
    this._position = [aRect.top, aRect.left]
    console.log('updatePosition')
  }

  debouncePositionTimeout = debounce(this.setPositionTimeout, POSITION_UPDATE_DEBOUNCE)

  /**
   * @param {array} position
   */
  setPosition([top, left]) {
    const node = this.node
    const style = node.style
    const rect = node.getBoundingClientRect()
    style.transition = null
    style.top = top === null?
      null :
      Math.min(Math.max(top, 0), window.innerHeight - rect.height) + 'px'
    style.left = left === null?
      null :
      Math.min(Math.max(left, 0), window.innerWidth - rect.width) + 'px'
  }

  onKeyDown = e => {
    if(this.props.hidden || e.code !== 'Escape') {
      return
    }
    e.stopPropagation()
    this.props.onCancelEvent?.(e)
  }

  onDocClick = e => {
    if(this.props.hidden) {
      return
    }
    const node = this.node
    if(e.target !== node && node.contains(e.target)) {
      return
    }
    if(this.props.anchor?.node?.contains(e.target)) {
      return
    }
    this.props.onCancelEvent?.(e)
  }

  onDocFocusIn = e => {
    if(this.props.hidden) {
      return
    }
    const node = this.node
    if(node.contains(e.target) || this.props.anchor?.node?.contains(e.target)) {
      return
    }
    const popup = e.target.closest('.Popup')
    if(popup && popup.classList.contains('modal') && !popup.contains(node)) {
      return
    }
    this.props.onCancelEvent?.(e)
  }

  onDocKeyDown = e => {
    if(this.props.hidden || e.code !== 'Escape') {
      return
    }
    if(e.target === document.body || this.props.anchor?.node?.contains(e.target)) {
      e.stopPropagation()
      this.props.onCancelEvent?.(e)
    }
  }

  onDocScroll = e => {
    if(this.props.hidden || this.props.modal || !this.props.anchor) {
      return
    }
    const node = this.node
    if(this.direction === 'none' || !e.target.contains(node)) {
      return
    }
    const style = node.style
    const popup = node.getBoundingClientRect()
    const anchor = this.props.anchor.node.getBoundingClientRect()
    const [top, left] = this._position
    style.transition = 'none'
    style.top = popup.top + anchor.top - top + 'px'
    style.left = popup.left + anchor.left - left + 'px'
    this._position = [anchor.top, anchor.left]
    this.clearPositionTimeout()
    this.debouncePositionTimeout()
  }

  onWinResize = () => {
    this.clearPositionTimeout()
    this.debouncePositionTimeout()
  }

  /**
   * @return {string}
   */
  get direction() {
    return this.props.anchor? this.props.direction || 'bottom-right' : 'none'
  }

  /**
   * @returns {number[]}
   */
  get durations() {
    const node = this.node
    if(!node) {
      return [0]
    }
    const style = getComputedStyle(node)
    const durations = style.transitionDuration.split(', ')
    return durations.map(duration => parseFloat(duration) * 1000)
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
