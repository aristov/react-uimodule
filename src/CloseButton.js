import { Button } from './Button'
import { CancelContext } from './Popup'

export function CloseButton(props) {
  const { onClick, ...rest } = props
  return (
    <CancelContext.Consumer>
      { onCancelEvent => (
        <Button
          classList="CloseButton"
          onClick={ onClick || onCancelEvent }
          { ...rest }
        />
      ) }
    </CancelContext.Consumer>
  )
}
