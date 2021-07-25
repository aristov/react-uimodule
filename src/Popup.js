import React from 'react'
import ReactDOM from 'react-dom'
import './Popup.css'

const DEBOUNCE = 200
const INTERVAL = 1000

export const CancelContext = React.createContext()

export class Popup extends React.Component
{
  elem = React.createRef()

  _position = [null, null]

  _closeTimer = null

  _positionTimer = null

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
        onTransitionEnd={ props.hidden && !state.hidden? this.hide : null }
        ref={ this.elem }
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

  componentDidMount() {
    this.props.hidden || this.open()
  }

  componentDidUpdate() {
    if(this.state.hidden) {
      this.props.hidden || this.open()
      return
    }
    if(this.props.hidden) {
      this.close()
      return
    }
    this.props.modal || this.updatePositionTick()
  }

  componentWillUnmount() {
    clearTimeout(this._closeTimer)
    this._closeTimer = null
    this.clearHandlers()
  }

  open() {
    this.props.modal || this.updatePositionTick()
    setImmediate(() => this.setState({ hidden : false }, this.setHandlers))
  }

  close() {
    const duration = getMaxTransitionDuration(this.elem.current)
    this._closeTimer = setTimeout(this.hide, duration)
    this.clearHandlers()
    if(this.props.modal || this.elem.current.contains(document.activeElement)) {
      this.props.anchor?.node?.focus()
    }
  }

  hide = () => {
    clearTimeout(this._closeTimer)
    this._closeTimer = null
    if(!this.elem.current || this.state.hidden) {
      return
    }
    this.setState({ hidden : true })
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
    clearTimeout(this._positionTimer)
    this._positionTimer = null
  }

  updatePositionTick = (debounce = null) => {
    clearTimeout(this._positionTimer)
    this._positionTimer = setTimeout(this.updatePositionTick, debounce || INTERVAL)
    debounce || this.updatePosition()
  }

  updatePosition = () => {
    const node = this.elem.current
    if(this.props.hidden || !this.props.anchor) {
      node.dataset.direction = 'none'
      return
    }
    const style = node.style
    style.transition = null
    if(this.props.direction === 'none') {
      node.dataset.direction = 'none'
      this._position = [style.top = null, style.left = null]
      return
    }
    const rectA = this.props.anchor.node.getBoundingClientRect()
    const rectP = node.getBoundingClientRect()
    const { alternatives, fallback } = directions[this.props.direction]
    let direction, position
    for(direction of [this.props.direction, ...alternatives]) {
      position = directions[direction].handler(rectA, rectP) || null
      if(position) {
        break
      }
    }
    const [top, left] = position || fallback()
    node.dataset.direction = position? direction : 'auto'
    style.top = Math.min(Math.max(top, 0), window.innerHeight - rectP.height) + 'px'
    style.left = Math.min(Math.max(left, 0), window.innerWidth - rectP.width) + 'px'
    this._position = [rectA.top, rectA.left]
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
    if(e.target !== this.elem.current && this.elem.current.contains(e.target)) {
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
    if(this.elem.current.contains(e.target) || this.props.anchor?.node?.contains(e.target)) {
      return
    }
    const popup = e.target.closest('.Popup')
    if(popup && popup.classList.contains('modal') && !popup.contains(this.elem.current)) {
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
    if(this.props.hidden || !this.props.anchor || this.props.direction === 'none') {
      return
    }
    if(!e.target.contains(this.elem.current)) {
      return
    }
    const rectA = this.props.anchor.node.getBoundingClientRect()
    const rectP = this.elem.current.getBoundingClientRect()
    const [top, left] = this._position
    const style = this.elem.current.style
    style.transition = 'none'
    style.top = rectA.top + rectP.top - top + 'px'
    style.left = rectA.left + rectP.left - left + 'px'
    this._position = [rectA.top, rectA.left]
    this.updatePositionTick(DEBOUNCE)
  }

  onWinResize = () => {
    if(this.props.hidden || !this.props.anchor) {
      return
    }
    this.updatePositionTick(DEBOUNCE)
  }

  get node() {
    return this.elem.current
  }

  static defaultProps = {
    direction : 'bottom-right'
  }
}

function getMaxTransitionDuration(node) {
  const style = getComputedStyle(node)
  const items = style.transitionDuration.split(', ')
  const durations = items.map(duration => parseFloat(duration) * 1000)
  return Math.max(...durations)
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
