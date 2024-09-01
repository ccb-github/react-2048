import { useState } from "react"
import { useWindowDimensions } from "react-native"

export default function useScaledFontSize(size: number) {
  const { fontScale } = useWindowDimensions()
  const [absoluteSize] = useState<number>(fontScale * size)

  return absoluteSize
}
