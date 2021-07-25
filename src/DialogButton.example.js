import React from 'react'
import { Example } from './Example'
import { Heading } from './Heading'
import { DialogButton } from './DialogButton'
import { Dialog } from './Dialog'
import { DialogHead } from './DialogHead'
import { CancelButton } from './CancelButton'
import { DialogBody } from './DialogBody'
import { TextBox } from './TextBox'
import { CloseButton } from './CloseButton'

export default function DialogButtonExample() {
  return (
    <Example>
      <Heading>DialogButton</Heading>
      <DialogButton
        label="Open dialog"
        dialog={ props => (
          <Dialog { ...props }>
            <DialogHead>
              <Heading>Hello!</Heading>
              <CancelButton/>
            </DialogHead>
            <DialogBody>
              <TextBox label="Say something"/>
              <CloseButton>Close</CloseButton>
            </DialogBody>
          </Dialog>
        ) }
      />
      <DialogButton
        label="Open modal dialog"
        dialog={ props => (
          <Dialog title="Hello!" modal { ...props }>
            <DialogButton
              label="Open nested dialog"
              dialog={ props => (
                <Dialog title="Hello!" { ...props }>
                  <TextBox label="Say something"/>
                  <CloseButton>Close</CloseButton>
                </Dialog>
              ) }
            />
            <CloseButton>Close</CloseButton>
          </Dialog>
        ) }
      />
    </Example>
  )
}
