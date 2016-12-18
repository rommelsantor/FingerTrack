const FingerTrack = (function() {
  const first = {}
  const last = {}
  const moveFuncs = []
  const endFuncs = []

  const getCoords = event => ({ x: event.touches[0].pageX, y: event.touches[0].pageY })

  const start = event => {
    Object.assign(first, getCoords(event))
  }

  const move = event => {
    Object.assign(last, getCoords(event))

    moveFuncs.map(func => {
      const coords = getCoords(event)
      func({ x: coords.x - first.x, y: coords.y - first.y })
    })
  }

  const end = event => {
    endFuncs.map(func => {
      func({ x: first.x - last.x, y: first.y - last.y })
    })
  }

  return (() => {
    document.addEventListener('touchstart', start)
    document.addEventListener('touchmove', move)
    document.addEventListener('touchend', end)
    document.addEventListener('touchcancel', end)

    return {
      start,
      end,
      move,
      onMove: func => {
        moveFuncs.push(func)
      },
      onEnd: func => {
        endFuncs.push(func)
      }
    }
  })()
})()
