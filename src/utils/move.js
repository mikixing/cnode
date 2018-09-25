//miki
export const curve = Move.prototype = {
	extend: function (obj) {
		for (var k in obj) {
			if (k in curve) {
				alert(k + 'modify')
			}
			curve[k] = (function (moveType) {
				return function doMove() {
					_doMove.call(this, arguments, moveType)
				}
			})(obj[k])
		}
	}
}
function Move () {}
var request, cancel, _move
request = window.requestAnimationFrame
cancel = window.cancelAnimationFrame

if (request) {
	_move = function (fn, timer) {
		if (!fn()) {
			timer.id = request(function () {
				_move(fn, timer)
			})
		} else {
			cancel(timer.id)
		}
	}
} else {
	_move = function (fn, timer) {
		request = function () {
			timer.id = setInterval(function () {
				fn()
				if (fn()) {
					cancel(timer.id)
					return
				}
				console.log(timer.id)
			}, 16)
		}
		request()
	}
	cancel = function (timer) {
		clearInterval(timer)
	}
}

function _doMove (arg, moveType) {
	var arr, a, b, d, x, y, fn, startTime, timer, self
	for (var i = 0; i < arg.length; i++) {
		if (typeof arg[i] === 'object' && !arr) {
			arr = arg[i]
		} else if (typeof arg[i] === 'number' && !d) {
			d = arg[i]
		} else if (typeof arg[i] === 'function' && !fn) {
			fn = arg[i]
		} else if (typeof arg[i] === 'function' && !fnEnd) {
			fnEnd = arg[i]
		}
	}
	a = arr[0]
	b = arr[1]
	d = d || 500
	startTime = +new Date()
	timer = 't' + Math.random()
	this[timer] = {}
	self = this
	_move(function test () {
		var nowTime = +new Date()
		x = (nowTime - startTime)/d
		if (x >= 1) {
			fn(b)
			return true
		} else {
			y = moveType(x)
			fn((b-a)*y+a)
			return false
		}
	}, self[timer])
}
var obj = {
	ease: function (x) {
		if (x <= 0.5) {
			return 2*x*x
		} else {
			return -2*x*x + 4*x - 1
		}
	},
	easeIn: function (x) {
		return x*x
	},
	easeOut: function (x) {
		return Math.pow(x, 1/3)
	},
	line: function (x) {
		return x
	}
}
curve.extend(obj)
if (typeof module === 'object' && module.exports) {
	module.exports = new Move
} else if (window.move) {
	alert('move已经存在')
} else {
	window.move = new Move
}