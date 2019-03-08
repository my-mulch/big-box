# big-box

That numpy shit in the browser, feel?

#### Installation

```sh
npm install big-box
```

```js
import bb from 'big-box'
```
## Basics

#### Array Creation

```js
> const a = bb.array({ with: [2,3,4] })
> a
[ 2, 3, 4]
> const b = bb.array({ with: [[1,2,3], [4,5,6]] })
> b
[[ 1, 2, 3],
[ 4, 5, 6]])
```

```js
> a = bb.arange({ stop: 15 }).reshape(3, 5)
[[  0,  1,  2,  3,  4],
[  5,  6,  7,  8,  9],
[ 10, 11, 12, 13, 14]])

> a.header.shape
[ 3, 5]

```

