# React UI Module

**Unstable, do not use in production!**

This is a library of accessible React UI components.

Based on the [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2) web standard.

- [Showcase](https://aristov.github.io/react-uimodule)

_Work in progress_

## Code examples

Button

```js
function ButtonExample() {
  const [pressed, setPressed] = useState(true)
  return (
    <div>
      <Button>Simple</Button>
      <Button
        pressed={ pressed }
        onClick={ () => setPressed(!pressed) }
      >
        Pressed (controlled)
      </Button>
      <Button defaultPressed={ true }>Pressed (uncontrolled)</Button>
      <Button disabled={ true }>Disabled</Button>
    </div>
  )
}
```

CheckBox

```js
function CheckBoxExample() {
  const [checked, setChecked] = useState(true)
  return (
    <div>
      <CheckBox label="Not checked"/>
      <CheckBox
        label="Controlled"
        checked={ checked }
        onClick={ () => setChecked(!checked) }
      />
      <CheckBox
        label="Uncontrolled"
        defaultChecked
      />
      <CheckBox
        label="Mixed"
        defaultChecked="mixed"
      />
      <CheckBox
        label="Disabled"
        disabled
      />
    </div>
  )
}
```

RadioGroup

```js
const radios = [
  'Babel', 'React', 'Webpack',
]
.map((label, i) => ({ label, value : String(i) }))

function RadioGroupExample() {
  const [value, setValue] = useState(radios[1].value)
  return (
    <div>
      <RadioGroup
        label="Not checked"
        radios={ radios }
      />
      <RadioGroup
        label="Controlled"
        radios={ radios }
        value={ value }
        onChange={ value => setValue(value) }
      />
      <RadioGroup
        label="Uncontrolled"
        radios={ radios }
        defaultValue={ radios[1].value }
      />
      <RadioGroup
        label="Disabled"
        radios={ radios }
        disabled
      />
    </div>
  )
}
```

ListBox

```js
const options = [
  'jQuery', 'Angular', 'React', 'Vue', 'Ember', 'Backbone', 'Svelte',
]
.map((label, i) => ({ label, value : String(i) }))

function ListBoxExample() {
  const [value, setValue] = useState(options[2].value)
  return (
    <div>
      <ListBox
        label="Not selected"
        options={ options }
      />
      <ListBox
        label="Controlled"
        options={ options }
        value={ value }
        onChange={ value => setValue(value) }
      />
      <ListBox
        label="Uncontrolled"
        options={ options }
        defaultValue={ options[2].value }
      />
      <ListBox
        label="Disabled"
        options={ options }
        disabled
      />
    </div>
  )
}
```

TextBox

```js
function TextBoxExample() {
  const [value, setValue] = useState('Hello React!')
  return (
    <div>
      <TextBox label="Empty"/>
      <TextBox
        label="Controlled"
        value={ value }
        onChange={ e => setValue(e.target.value) }
      />
      <TextBox
        label="Uncontrolled"
        defaultValue="Hello React!"
      />
      <TextBox
        label="Disabled"
        disabled
      />
    </div>
  )
}
```

Popup

```js
function PopupExample() {
  const [hidden, setHidden] = useState(true)
  const [anchor, setAnchor] = useState(null)
  const getAnchor = useCallback(elem => elem === null || setAnchor(elem), [])
  return (
    <div>
      <Button
        onClick={ () => setHidden(!hidden) }
        ref={ getAnchor }
      >
        Open popup
      </Button>
      <Popup
        hidden={ !anchor || hidden }
        anchor={ anchor }
        onCancelEvent={ () => setHidden(true) }
      >
        <Button onClick={ () => setHidden(true) }>Close the popup</Button>
      </Popup>
    </div>
  )
}
```

SelectBox

```js
const options = [
  'jQuery', 'Angular', 'React', 'Vue', 'Ember', 'Backbone', 'Svelte',
]
.map((label, i) => ({ label, value : String(i) }))

export default function SelectBoxExample() {
  const [value, setValue] = useState(options[2].value)
  return (
    <div>
      <SelectBox
        label="Not selected"
        options={ options }
      />
      <SelectBox
        label="Controlled"
        options={ options }
        value={ value }
        onChange={ value => setValue(value) }
      />
      <SelectBox
        label="Uncontrolled"
        options={ options }
        defaultValue={ options[2].value }
      />
      <SelectBox
        label="Required"
        options={ options }
        defaultValue={ options[2].value }
        required
      />
      <SelectBox
        label="Disabled"
        options={ options }
        disabled
      />
    </div>
  )
}
```

Dialog

```js
function DialogExample() {
  const [hidden, setHidden] = useState(true)
  const [anchor, setAnchor] = useState(null)
  const getAnchor = useCallback(elem => elem && setAnchor(elem), [])
  return (
    <div>
      <Button
        onClick={ () => setHidden(!hidden) }
        ref={ getAnchor }
      >
        Open modal dialog
      </Button>
      <Dialog
        modal
        title="Hello!"
        hidden={ !anchor || hidden }
        anchor={ anchor }
        onCancelEvent={ () => setHidden(true) }
      >
        <TextBox label="Say something"/>
        <CloseButton>Close</CloseButton>
      </Dialog>
    </div>
  )
}
```

DialogButton

```js
function DialogButtonExample() {
  return (
    <div>
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
    </div>
  )
}
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## License

[The MIT License (MIT)](https://raw.githubusercontent.com/aristov/react-uimodule/master/LICENSE)
