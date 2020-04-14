# big-box

NumPy browser clone

#### Installation

```sh
npm install big-box
```
#### Tensor Creation

The tensors may be of type: real, complex, and quaternion. The size of the last dimension indicates the type. For example, each of the arrays below are complex.

```js
import bb from 'big-box'

const A = bb.tensor([
    [[10, 2]],
    [[40, 3]],
    [[50, 1]],
])

const K = bb.tensor([
    [[5, 3], [4, 2], [4, 8], [9, 7]],
    [[4, 7], [9, 2], [4, 4], [4, 8]],
    [[3, 1], [4, 3], [5, 1], [7, 7]],
    [[4, 5], [7, 3], [3, 5], [7, 3]]
])
```

#### Cached Operations

`Cached Operations` allow big-box to generate ultra-efficient templated code that can then be called with any inputs provided they are the same size and type

```js
const multiplyBy10 = new bb.cached.multiply({ of: A, with: 10 })
const result = multiplyBy10.invoke()


// [["100.00+20.00i"], 
//  ["400.00+30.00i"], 
//  ["500.00+10.00i"]]

```

#### Many of the NumPy friends

```js
bb.arange(0, 10)
bb.linspace(0, 2 * Math.PI, 4)
bb.ones([100, 100], bb.ComplexFloat32)
```
