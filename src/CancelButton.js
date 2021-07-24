import { Button } from './Button'
import { CancelContext } from './Popup'
import './CancelButton.css'

export function CancelButton(props) {
  return (
    <CancelContext.Consumer>
      { onCancelEvent => (
        <Button
          classList="CancelButton"
          tabIndex={ typeof props.tabIndex === 'undefined'? -1 : props.tabIndex }
          title={ props.title || 'Cancel' }
          disabled={ props.disabled }
          onClick={ props.onClick || onCancelEvent }
        />
      ) }
    </CancelContext.Consumer>
  )
}
