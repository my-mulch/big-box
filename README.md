# Multi-Dim
Methods to Manipulate N-Dimensional Arrays. It's a numpy clone in progress...

const ndim = require('./Multi-Dim')

> a = new ndim.Array([[1,2,3,3,2,3],[4,2,3,5,3,2],[4,3,2,4,3,2]])

array([[1, 2, 3, 3, 2, 3],
	[4, 2, 3, 5, 3, 2],
	[4, 3, 2, 4, 3, 2]])


> b = a.copy()
array([[1, 2, 3, 3, 2, 3],
	[4, 2, 3, 5, 3, 2],
	[4, 3, 2, 4, 3, 2]])

> b.plus(a)
array([[2, 4, 6, 6, 4, 6],
	[8, 4, 6, 10, 6, 4],
	[8, 6, 4, 8, 6, 4]])

> b.reshape(3,3,2)

array([[[1, 2],
	[3, 3],
	[2, 3]],

	[[4, 2],
	[3, 5],
	[3, 2]],

	[[4, 3],
	[2, 4],
	[3, 2]]])
