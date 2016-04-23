FuckMyScroll
============
Animated scrolling to certain point or anchor.

Your can see a demo [here](http://codepen.io/GabrielJMJ/pen/RaBJWo).

## Installing
Install via [npm](http://npmjs.com/package/fuckmyscroll)
```bash
$ npm install --save fuckmyscroll
```

## Usage
In your script, create an instance of ```FuckMyScroll```
```js
const fms = new FuckMyScroll();
fms.init();
```

### Working with anchors
Truly is not necessary be an anchor, but have ```href``` and ```fmscroll``` attributes.
```html
<button href="#about" fmscroll>About</button>

<!-- Goes to -->
<article id="about">
  <!-- ... -->
</article>
```

### Going to page points
Scroll by cordenates
```js
let X = 0,
  Y = 1200;

fms.scrollTo(X, Y);
```

### Options
```js
const fms = new FuckMyScroll({
  speed: 14, // 14px/ms,
  init: () => {},
  end: () => {}
});
```

* **speed**
It is possible determine the speed, measured in ```pixels/milliseconds```. Default is ```7px/ms```.
```js
{
  speed: 20 // 20px/ms
}
```
* **init**
Callback executed on proccess initiation.
```js
{
  init: () => { // ... }
}
```

* **end**
Callback executed on proccess finalization.
```js
{
  end: () => { // ... }
}
```
