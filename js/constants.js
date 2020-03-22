const TYPE_COLORS = {
  "L": 'red',
  "T": 'purple',
  "I": 'green'
}


const INITIAL_POSITIONS_I = [ [[9, 2], [8, 2], [7, 2]], [[9, 1], [9, 2], [9, 3]] ]

const INITIAL_POSITIONS_L = [ [[9, 1], [8, 1], [8, 2], [8, 3]],
[[9, 0], [8, 0], [7, 0], [7, 1]], [[9, 4], [8, 4], [7, 4], [7, 3]], 
[[9, 1], [9, 2], [9, 3], [8, 3]] ]


const INITIAL_POSITIONS_T = [ [[9, 2], [9, 3], [9, 4], [8, 3]], 
[[8, 2], [8, 3], [8, 4], [9, 3]], [[9, 4], [8, 3], [8, 4], [7, 4]],
[[9, 0], [8, 0], [8, 1], [7, 0]] ]



const INITIAL_POSITIONS = {
  "L": INITIAL_POSITIONS_L,
  "T": INITIAL_POSITIONS_T,
  "I": INITIAL_POSITIONS_I
}

// Event keys
const DOWN  = 40;
const LEFT  = 37;
const RIGHT = 39;
const PAUSE = 32;