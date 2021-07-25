import React from 'react'
import './Heading.css'

export function Heading(props) {
  return (
    <div
      className="Heading"
      role="heading"
      aria-level={ props.level || 1 }
      { ...props }
    >
      { props.children }
    </div>
  )
}
