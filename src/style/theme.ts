export const size = {
  mobile: '770px',
  tablet: '1023px',
  laptop: '1460px'
}

export const theme = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width: ${size.mobile}) and (max-width: ${size.tablet})`,
  laptop: `(min-width: ${size.tablet}) and (max-width: ${size.laptop})`,
  desktop: `(min-width: ${size.laptop})`,

  borderRadius: '12px',
  colors: {
    primary: '#5060e7',
    secondary: '#6471e9',
    third: '#6e9cef',
    text_primary: '#000',
    text_secondary: '#2d2c2c',
    background: '#ededed',
    green: '#b4d5cf',
    red: '#fc6262',
    orange: '#fda363',
    blue: '#50b1f7',
    salmon: '#e4c7b8',
    lightblue: '#d8e0e8',
    footer_bg: '#e9ecff',
    footer_active: '#6471e9',
    footer_inactive: '#a8a8a9'
  }
}
