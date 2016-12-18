# FingerTrack
Touch-device finger-tracking for one-to-one screen-to-finger effects (written with ES6)

This simple utility object provides an interface allowing you to track finger touch-and-drag movements on a touchscreen device. It allows you to simply define callbacks that will be passed the distance in pixels that the user has dragged their finger as `x` and `y` object properties.

Here is an example from the use case where I needed (and thus, implemented) this functionality. I just needed the 90%-wide element (in phone view only) to be draggable a little bit left and right so it feels like it's a movable object. Then upon releasing, it needed to ease back into its original position, centered in the phone.

```
// register a callback when a touch-dragging finger moves
FingerTrack.onMove(({ x }) => {// in this case I just need the x distance traveled
  const MAX_DIST = 50
  
  // don't let the movable box go more than 50px in either direction
  const dist = Math.min(MAX_DIST, Math.abs(x)) * (x < 0 ? -1 : 1)

  // use a transform to cleanly shift the element left or right
  $('#propcard').css({ transform: `translateX(${dist}px)` })
})

// register a callback when the finger is lifted (or touch ends for any reason; e.g., an alert() popped up)
FingerTrack.onEnd(() => {
  // return the box to its original position (use a css transition for a nice, smooth element return)
  $('#propcard').css({ transform: 'translateX(0)' })
})
```
