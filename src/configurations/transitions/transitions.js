import { Animated, Easing, Platform } from 'react-native'

export const customCurve = Easing.bezier(0.55, 0.03, 0, 0.96)

export function fromLeft({ duration = 300 }) {
  return {
    transitionSpec: {
      duration,
      easing: customCurve,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ layout, position, scene }) => {
      const { index } = scene
      const { initWidth } = layout

      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [-initWidth, 0, 0],
      })

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      })

      return { opacity, transform: [{ translateX }] }
    },
  }
}

export function fromTop({ duration = 300 }) {
  return {
    transitionSpec: {
      duration,
      easing: customCurve,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ layout, position, scene }) => {
      const { index } = scene
      const { initHeight } = layout

      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [-initHeight, 0, 0],
      })

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      })

      return { opacity, transform: [{ translateY }] }
    },
  }
}

export function fromRight({ duration = 300, percentageRange = 0 }) {
  return {
    transitionSpec: {
      duration,
      easing: customCurve,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ layout, position, scene }) => {
      const { index } = scene
      const { initWidth } = layout
      const finalWidth = -initWidth * percentageRange

      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initWidth, 0, finalWidth],
      })

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      })

      return { opacity, transform: [{ translateX }] }
    },
  }
}

export function fromBottom({ duration = 300, percentageRange = 0 }) {
  return {
    transitionSpec: {
      duration,
      easing: customCurve,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ layout, position, scene }) => {
      const { index } = scene
      const { initHeight } = layout
      const finalHeight = -initHeight * percentageRange

      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initHeight, 0, finalHeight],
      })

      return { transform: [{ translateY }] }
    },
  }
}

export function fadeIn({ duration = 300 }) {
  return {
    transitionSpec: {
      duration,
      easing: customCurve,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ position, scene }) => {
      const { index } = scene

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1],
      })

      return { opacity }
    },
  }
}

export function zoomIn({ duration = 300 }) {
  return {
    transitionSpec: {
      duration,
      easing: customCurve,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ position, scene }) => {
      const { index } = scene
      let start = 0

      if (Platform.OS !== 'ios') {
        start = 0.005
      }

      const scale = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [start, 1],
      })

      return { transform: [{ scale }] }
    },
  }
}

export function zoomOut({ duration = 300 }) {
  return {
    transitionSpec: {
      duration,
      easing: customCurve,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ position, scene }) => {
      const { index } = scene

      const scale = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [10, 1],
      })

      return { transform: [{ scale }] }
    },
  }
}

export function flipY(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: customCurve,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ position, scene }) => {
      const { index } = scene

      const rotateY = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: ['180deg', '0deg'],
      })

      return { transform: [{ rotateY }], backfaceVisibility: 'hidden' }
    },
  }
}

export function flipX(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: customCurve,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ position, scene }) => {
      const { index } = scene

      const rotateX = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: ['180deg', '0deg'],
      })

      return { transform: [{ rotateX }], backfaceVisibility: 'hidden' }
    },
  }
}

export function nonAnimation() {
  return {
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0,
    },
  }
}
