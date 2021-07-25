import React, { createElement } from 'react'
import './Showcase.css'

class Showcase extends React.Component
{
  render() {
    return (
      <div className="Showcase">
        { createElement(require('./Button.example').default) }
        { createElement(require('./CheckBox.example').default) }
        { createElement(require('./RadioGroup.example').default) }
        { createElement(require('./ListBox.example').default) }
        { createElement(require('./TextBox.example').default) }
        { createElement(require('./Popup.example').default) }
        { createElement(require('./SelectBox.example').default) }
        { createElement(require('./Dialog.example').default) }
        { createElement(require('./DialogButton.example').default) }
      </div>
    )
  }
}

export { Showcase }
