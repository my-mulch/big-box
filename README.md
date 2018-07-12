## Multi-Dim

An npm package for scientific computing with JavaScript. It contains primarily:
 - a powerful N-dimensional array object

## Installation

```sh
npm install multi-dim
```

```js
const ndim = require('multi-dim');
```
## Basics

### Array Creation

```js
> const a = ndim.array([2,3,4]);
> a
array([ 2, 3, 4])
> const b = ndim.array([[1,2,3], [4,5,6]]);
> b
array([[ 1, 2, 3],
       [ 4, 5, 6]])
```

Example:
```js
> a = ndim.arange(15).reshape(3, 5);
array([[  0,  1,  2,  3,  4],
       [  5,  6,  7,  8,  9],
       [ 10, 11, 12, 13, 14]])

> a.header.shape
[ 3, 5]

```

### Indexing, Slicing, and Striding
-1, or ':', or any number less than 0

```js
> const a = ndim.array([0,1,2]);
> a.slice(1)
1

> const b = ndim.arange(3*3).reshape(3,3);
> b
array([[  0,  1,  2],
       [  3,  4,  5],
       [  6,  7,  8])
> b.slice(':',1)
array([[1,4,7]])

```