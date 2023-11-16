import { Grid } from 'antd'

import { isMobile, isTablet, getOs } from '../helpers/userAgentHelpers'

const { useBreakpoint } = Grid

/**
 * Helps us handling responsive views and logics
 */
export default function useResponsive() {
  const os = getOs()
  const defXxl = window.innerWidth >= 1600
  const defXl = window.innerWidth >= 1200
  const defLg = window.innerWidth >= 992
  const defMd = window.innerWidth >= 768
  const defSm = window.innerWidth >= 576
  const { xxl = defXxl, xl = defXl, lg = defLg, md = defMd, sm = defSm } = useBreakpoint()

  /**
   * Device type based
   */
  const isTabletDevice = isTablet()
  const isMobileDevice = isMobile()
  const isTabletOrMobileDevice = isTabletDevice || isMobileDevice
  /**
   * Os type based
   */
  const isAndroidDevice = os.name === 'Android'
  const isIosDevice = os.name === 'iOS'

  /**
   * View port based
   */
  const isTabletView = !xxl && !xl && lg
  const isMobileView = !xxl && !xl && !lg

  return {
    isAndroidDevice,
    isIosDevice,
    isTabletDevice,
    // includes device user agent type
    isMobile: isMobileView || isMobileDevice,
    isTablet: isTabletView || isTabletDevice,
    isTabletOrMobile: isMobileView || isMobileDevice || isTabletView || isTabletDevice,
    isTabletOrMobileDevice,
    // view port based
    isOnlyXXl: xxl,
    isOnlyXl: !xxl && xl,
    isOnlyLg: !xxl && !xl && lg,
    isOnlyMd: !xxl && !xl && !lg && md,
    isOnlySm: !xxl && !xl && !lg && !md && sm,
    isOnlyXs: !xxl && !xl && !lg && !md && !sm,
    // relative
    isLessThanXXl: !xxl,
    isLessThanXl: !xxl && !xl,
    isLessThanLg: !xxl && !xl && !lg,
    isLessThanMd: !xxl && !xl && !lg && !md,
    isLessThanSm: !xxl && !xl && !lg && !md && !sm,
    isGreaterThanXl: xxl,
    isGreaterThanLg: xxl || xl,
    isGreaterThanMd: xxl || xl || lg,
    isGreaterThanSm: xxl || xl || lg || md,
    isGreaterThanXs: xxl || xl || lg || md || sm,
  }
}
