import * as Animatable from 'react-native-animatable'

Animatable.initializeRegistryWithDefinitions({
  mergeAnimation: {
    0: {
			opacity: 1,
			scaleX: 1,
			scaleY: 1,
		},
		0.5: {
			opacity: 0.5,
			scaleX: 1.05,
			scaleY: 1
		},
		1: {
			opacity: 1,
			scaleX: 1,
			scaleY: 1
		}
  },
	
  NEW:{
		0: {
			opacity: 0,
			scaleX: 0.5,
			scaleY: 0.5,
		},
		0.5: {
			opacity: 0.7,
			scaleX: 0.8,
			scaleY: 0.8
		},
		1: {
			opacity: 1,
			scaleX: 1,
			scaleY: 1
		}

  },
	moveUP: {
		0: {
			opacity: 1,
			scaleX: 1,
			scaleY: 1,
		},
		0.5: {
			opacity: 0.2,
			scaleX: 0.5,
			scaleY: 0.5
		},
		1: {
			opacity: 0,
			scaleX: 0,
			scaleY: 0
		}

	},
	moveDOWN: {
		0: {
			opacity: 1,
			scaleX: 1,
			scaleY: 1,
		},
		0.5: {
			opacity: 0.2,
			scaleX: 0.5,
			scaleY: 0.5
		},
		1: {
			opacity: 0,
			scaleX: 0,
			scaleY: 0
		}

	},
	moveLEFT: {
		0: {
			opacity: 1,
			scaleX: 1,
			scaleY: 1,
		},
		0.5: {
			opacity: 0.2,
			scaleX: 0.5,
			scaleY: 0.5
		},
		1: {
			opacity: 0,
			scaleX: 0,
			scaleY: 0
		}

	},
	moveRIGHT: {
		0: {
			opacity: 1,
			scaleX: 1,
			scaleY: 1,
		},
		0.5: {
			opacity: 0.2,
			scaleX: 0.5,
			scaleY: 0.5
		},
		1: {
			opacity: 0,
			scaleX: 0,
			scaleY: 0
		}

	},
});

export default Animatable
