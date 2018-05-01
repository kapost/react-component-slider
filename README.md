# React Component Slider

This component is useful for situations where you are trying to fit components (e.g. menu/tab navigation) into a horizontal space that could be limited by screen width.  It is a simple, lightweight approach that adds scroll arrows when the contents overflow.  

![Example menu navigation](http://g.recordit.co/jQhnEyGx9q.gif)

## Installation

Add package:

```sh
# yarn
yarn add @kapost/react-component-slider

# npm
npm install --save @kapost/react-component-slider
```

Import component:

```js
import ComponentSlider from "@kapost/react-component-slider";
```

Import base styles (modify for your pipeline tool of choice):

```scss
@import "@kapost/react-component-slider/lib/stylesheets/component-slider"
```


## Quick Start

```js
<ComponentSlider>
  { inline elements }
</ComponentSlider>
```

## Props

### `children` (`node`, required)

Render any arbitrary number of children.  This component is designed for inline / horizontally-oriented elements.

### `renderLeftArrow` / `renderRightArrow` (`func`, optional)

Override what renders for the arrows/navigation. Defaults to:

```js
    renderLeftArrow: () => <span>&larr;</span>,
    renderRightArrow: () => <span>&rarr;</span>,
```


## Why are there no tests?

It's difficult to test resizing behavior of this nature without writing integration tests.  Due to the simplicity of the component, I opted not to do that.

## License

MIT