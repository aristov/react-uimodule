import { Button } from './Button'
import './CancelButton.css'

export function CancelButton(props) {
  return (
    <Button
      classList="CancelButton"
      tabIndex={ typeof props.tabIndex === 'undefined'? -1 : props.tabIndex }
      title={ props.title || 'Cancel' }
      disabled={ props.disabled }
      onClick={ props.onClick }
    />
  )
}
