## Multi-Dim

__Multi-Dim__ is a npm package for scientific computing with JavaScript. It contains among other things:
 - a powerful N-dimensional array object
 - linear algebra function
 - more to come

It works both in node.js and in the browser

## Installation

```sh
npm install multi-dim
```

```js
const {ndim} = require('multi-dim');
...
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

To create arrays with a given shape, you can use `zeros`, `ones` or `random` functions:

```js
> ndim.zeros([2,3]);
array([[ 0, 0, 0],
       [ 0, 0, 0]])
> ndim.ones([2,3,4])     // dtype can also be specified
array([[[ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1]],
       [[ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1]]])

> ndim.random([4,3])
array([[ 0.9182 , 0.85176, 0.22587],
       [ 0.50088, 0.74376, 0.84024],
       [ 0.74045, 0.23345, 0.20289],
       [ 0.00612, 0.37732, 0.06932]])
```

To create sequences of numbers, __ndim__ provides a function called `arange`:

```js
> ndim.arange(4);
array([ 0, 1, 2, 3])

> ndim.arange( 10, 30, 5 )
array([ 10, 15, 20, 25])

> ndim.arange(1, 5);
array([ 1, 2, 3, 4])
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
-1 takes the place of colon

```js
> var a = ndim.array([0,1,2]);
> a.slice(1)
1

> var b = ndim.arange(3*3).reshape(3,3);
> b
array([[  0,  1,  2],
       [  3,  4,  5],
       [  6,  7,  8])
> b.slice(-1,1)
array([[1,4,7]])

```

### Basic operations -- EVERYTHING BELOW IS UNDER CONSTRUCTION

Arithmetic operators such as `*` (`multiply`), `+` (`add`), `-` (`subtract`), `/` (`divide`), `**` (`pow`), `=` (`assign`) apply elemen-twise. A new array is created and filled with the result:

```js
> zeros = ndim.zeros([3,4]);
array([[ 0, 0, 0, 0],
       [ 0, 0, 0, 0],
       [ 0, 0, 0, 0]])
>
> ones = ndim.ones([3,4]);
array([[ 1, 1, 1, 1],
       [ 1, 1, 1, 1],
       [ 1, 1, 1, 1]])
>
> ones.plus(ones)
array([[ 2, 2, 2, 2],
       [ 2, 2, 2, 2],
       [ 2, 2, 2, 2]])
>
> ones.minus(ones)
array([[ 0, 0, 0, 0],
       [ 0, 0, 0, 0],
       [ 0, 0, 0, 0]])
>

```

The matrix product can be performed using the `dot` function:

```js
> a = ndim.arange(12).reshape(3,4);
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
>
> ndim.dot(a.T(), a)
array([[  80,  92, 104, 116],
       [  92, 107, 122, 137],
       [ 104, 122, 140, 158],
       [ 116, 137, 158, 179]])
>
> ndim.dot(a, a.T())
array([[  14,  38,  62],
       [  38, 126, 214],
       [  62, 214, 366]])
```

Many unary operations, such as computing the sum of all the elements in the array, are implemented as methods of the `NdArray` class:

```js
> a = nj.random([2,3])
array([[0.62755, 0.8278,0.21384],
       [ 0.7029,0.27584,0.46472]])
> a.sum()
3.1126488673035055
>
> a.min()
0.2138431086204946
>
> a.max()
0.8278025290928781
>
> a.mean()
0.5187748112172509
>
> a.std()
0.22216977543691244
```

### Universal Functions
__NumJs__ provides familiar mathematical functions such as `sin`, `cos`, and `exp`. These functions operate element-wise on an array, producing an `NdArray` as output:

```js
> a = nj.array([-1, 0, 1])
array([-1, 0, 1])
>
> nj.negative(a)
array([ 1, 0,-1])
>
> nj.abs(a)
array([ 1, 0, 1])
>
> nj.exp(a)
array([ 0.36788,       1, 2.71828])
>
> nj.tanh(a)
array([-0.76159,       0, 0.76159])
>
> nj.softmax(a)
array([ 0.09003, 0.24473, 0.66524])
>
> nj.sigmoid(a)
array([ 0.26894,     0.5, 0.73106])
>
> nj.exp(a)
array([ 0.36788,       1, 2.71828])
>
> nj.log(nj.exp(a))
array([-1, 0, 1])
>
> nj.sqrt(nj.abs(a))
array([ 1, 0, 1])
>
> nj.sin(nj.arcsin(a))
array([-1, 0, 1])
>
> nj.cos(nj.arccos(a))
array([-1, 0, 1])
>
> nj.tan(nj.arctan(a))
array([-1, 0, 1])
```

### Shape Manipulation
An array has a shape given by the number of elements along each axis:

```js
> a = nj.array([[  0,  1,  2,  3], [  4,  5,  6,  7], [  8,  9, 10, 11]]);
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])

> a.shape
[ 3, 4 ]
```

The shape of an array can be changed with various commands:
```js
> a.flatten();
array([  0,  1,  2, ...,  9, 10, 11])
>
> a.T                   // equivalent to a.transpose(1,0)
array([[  0,  4,  8],
       [  1,  5,  9],
       [  2,  6, 10],
       [  3,  7, 11]])
>
> a.reshape(4,3)
array([[  0,  1,  2],
       [  3,  4,  5],
       [  6,  7,  8],
       [  9, 10, 11]])
>
```

Since `a` is matrix we may want its diagonal:
```js
> nj.diag(a)
array([  0,  5, 10])
>
```

### Identity matrix
The identity array is a square array with ones on the main diagonal:

```js
> nj.identity(3)
array([[ 1, 0, 0],
       [ 0, 1, 0],
       [ 0, 0, 1]])
```

### Concatenate different arrays

Several arrays can be stacked together using `concatenate` function:

```js
> a = nj.arange(12).reshape(3,4)
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
>
> b = nj.arange(3)
array([ 0, 1, 2])
>
> nj.concatenate(a,b.reshape(3,1))
array([[  0,  1,  2,  3,  0],
       [  4,  5,  6,  7,  1],
       [  8,  9, 10, 11,  2]])
```

__Notes__:
 - the arrays must have the same shape, except in the last dimension
 - arrays are concatenated along the last axis

It is still possible to concatenate along other dimensions using transpositions:

```js
> a = nj.arange(12).reshape(3,4)
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
>
> b = nj.arange(4)
array([ 0, 1, 2, 3])
>
> nj.concatenate(a.T,b.reshape(4,1)).T
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11],
       [  0,  1,  2,  3]])
```


### Stack multiple arrays

```js
> a = nj.array([1, 2, 3])
> b = nj.array([2, 3, 4])

> np.stack([a, b])
array([[1, 2, 3],
       [2, 3, 4]])
> np.stack([a, b], -1)
array([[1, 2],
       [2, 3],
       [3, 4]])
```

__Notes__:
 - the arrays must have the same shape
 - take an optional axis argument which can be negative

### Deep Copy
The `clone` method makes a complete copy of the array and its data.

```js
> a = nj.arange(12).reshape(3,4)
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
>
> b = a.clone()
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
>
> a === b
false
>
> a.set(0,0,1)
> a
array([[  1,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
> b
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
```

### Fast Fourier Transform (FFT)
`fft` and `ifft` functions can be used to compute the N-dimensional discrete Fourier Transform and its inverse.

Example:
```js
> RI = nj.concatenate(nj.ones([10,1]), nj.zeros([10,1]))
array([[ 1, 0],
       [ 1, 0],
       [ 1, 0],
        ...
       [ 1, 0],
       [ 1, 0],
       [ 1, 0]])
>
> fft = nj.fft(RI)
array([[ 10,  0],
       [  0,  0],
       [  0,  0],
        ...
       [  0,  0],
       [  0,  0],
       [  0,  0]])
>
> nj.ifft(fft)
array([[ 1, 0],
       [ 1, 0],
       [ 1, 0],
        ...
       [ 1, 0],
       [ 1, 0],
       [ 1, 0]])
```
__Note__: both `fft` and `ifft` expect last dimension of the array to contain 2 values: the real and the imaginary value


### Convolution

`convolve` function compute the discrete, linear convolution of two multi-dimensional arrays.

__Note__: The convolution product is only given for points where the signals overlap completely. Values outside the signal boundary have no effect. This behaviour is also known as the 'valid' mode.


Example:
```js
> x = nj.array([0,0,1,2,1,0,0])
array([ 0, 0, 1, 2, 1, 0, 0])
>
> nj.convolve(x, [-1,0,1])
array([-1,-2, 0, 2, 1])
>
> var a = nj.arange(25).reshape(5,5)
> a
array([[  0,  1,  2,  3,  4],
       [  5,  6,  7,  8,  9],
       [ 10, 11, 12, 13, 14],
       [ 15, 16, 17, 18, 19],
       [ 20, 21, 22, 23, 24]])
> nj.convolve(a, [[ 1, 2, 1], [ 0, 0, 0], [-1,-2,-1]])
array([[ 40, 40, 40],
       [ 40, 40, 40],
       [ 40, 40, 40]])
> nj.convolve(nj.convolve(a, [[1, 2, 1]]), [[1],[0],[-1]])
array([[ 40, 40, 40],
       [ 40, 40, 40],
       [ 40, 40, 40]])
```

__Note__: `convolve` uses Fast Fourier Transform (FFT) to speed up computation on large arrays.


### Other utils
`rot90`
```js
> m = nj.array([[1,2],[3,4]], 'int')
> m
array([[1, 2],
       [3, 4]])
> nj.rot90(m)
array([[2, 4],
       [1, 3]])
> nj.rot90(m, 2)
array([[4, 3],
       [2, 1]])
> m = nj.arange(8).reshape([2,2,2])
> nj.rot90(m, 1, [1,2])
array([[[1, 3],
        [0, 2]],
      [[5, 7],
       [4, 6]]])
```
