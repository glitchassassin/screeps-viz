# screeps-viz

![sample dashboard](images/demo.png)

A visualization library for [Screeps](https://screeps.com/)

## Installation

Install via npm:

```
npm install screeps-viz
```

## Usage

This library is designed around functional programming principles. Until we have better documentation, please consult the source and tests for each widget for its expected parameters, and see `src/demo.ts` for examples.

### Widgets

Most of the widgets will use a pattern like this, passing in a function that will be invoked each tick to get the current data & configuration.

```typescript
const barWidget = Bar(() => ({
    data: {
        value: Game.time % 20,
        maxValue: 20
    },
    config: {
        label: 'Bar 1',
        style: {
            stroke: 'red',
            fill: 'red',
            lineStyle: 'dashed'
        }
    }
})
```

### Dashboard

The Dashboard itself takes a list of Widgets with position & size information and renders each.

```typescript
export function loop() {
    Dashboard({ 
        widgets: [{
            x: 1,
            y: 1,
            width: 5,
            height: 10,
            widget: barWidget
        }]
    })
}
```