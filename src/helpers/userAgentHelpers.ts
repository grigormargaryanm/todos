import UAParser, { IOS } from 'ua-parser-js'

export enum DeviceTypes {
  CONSOLE = 'console',
  MOBILE = 'mobile',
  TABLET = 'tablet',
  SMARTTV = 'smarttv',
  WEARABLE = 'wearable',
  EMBEDDED = 'embedded',
  NONE = '',
}

/**
 * Will give device name
 */
export const getDeviceName = () => {
  const uaParser = new UAParser()
  return (uaParser.getDevice()?.type as DeviceTypes) || ''
}

/**
 * Will give OS info
 */
export const getOs = (): IOS => {
  const uaParser = new UAParser()
  return uaParser.getOS()
}

export const isMobile = () => {
  return getDeviceName() === DeviceTypes.MOBILE
}

export const isTablet = () => {
  return getDeviceName() === DeviceTypes.TABLET
}
