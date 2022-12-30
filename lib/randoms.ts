export const getRandomArrayItem = <CustomType>(array: CustomType[]): CustomType => array[Math.floor(Math.random() * array.length)]

const lowerCases = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const upperCases = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const specialCases = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '|', '\\', ']', '[', '<', '>', '?', ',', '.', '/']
const anything = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '|', '\\', ']', '[', '<', '>', '?', ',', '.', '/']

export const getRandomLowerCase = (): unknown => {
  return getRandomArrayItem<string>(lowerCases)
}

export const getRandomUpperCase = (): string => {
  return getRandomArrayItem<string>(upperCases)
}

export const getRandomSpecialCase = (): string => {
  return getRandomArrayItem(specialCases)
}

export const getAnyRandomCase = (): string => {
  return getRandomArrayItem(anything)
}

export const getRandomLowerCases = (size: number): string => {
  const final = []
  for (let i = 0; i < size; i++) {
    final.push(getRandomArrayItem(lowerCases))
  }
  return final.join('')
}

export const getRandomUpperCases = (size: number): string => {
  const final = []
  for (let i = 0; i < size; i++) {
    final.push(getRandomArrayItem(upperCases))
  }
  return final.join('')
}

export const getRandomSpecialCases = (size: number): string => {
  const final = []
  for (let i = 0; i < size; i++) {
    final.push(getRandomArrayItem(specialCases))
  }
  return final.join('')
}

export const getAnyRandomCases = (size: number): string => {
  const final = []
  for (let i = 0; i < size; i++) {
    final.push(getRandomArrayItem(anything))
  }
  return final.join('')
}

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export const getRandomDigit = (): string => {
  return getRandomArrayItem(digits)
}

export const getRandomDigits = (size: number): string => {
  const final = []
  for (let i = 0; i < size; i++) {
    final.push(getRandomDigit())
  }
  return final.join('')
}

export const getRandomEmailBasedOn = (baseEmail: string): string => {
  return baseEmail.replace('@', `+${getRandomDigits(6)}@`)
}
