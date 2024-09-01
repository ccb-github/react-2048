import { useState } from "react"
import { useWindowDimensions } from "react-native"

export default function useScaledSize (size: number) {
  const { scale } = useWindowDimensions()
  const [absoluteSize] = useState<number>(scale * size)

  return absoluteSize
}
