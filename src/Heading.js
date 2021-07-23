import React from 'react'
import './Heading.css'

export function Heading(props) {
  return (
    <div
      role="heading"
      className="Heading"
      aria-level={ props.level || 1 }
    >
      { props.children }
    </div>
  )
}
