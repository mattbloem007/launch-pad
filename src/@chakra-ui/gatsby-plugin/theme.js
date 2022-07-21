import { extendTheme } from '@chakra-ui/react'
const theme = {
  colors: {
    white: '#FFFFFF',
    blue: '#729AB0',
    mush: '#5E8195',
    mushTan: '#F0EBDD',
    navy: '#164057',
    brownE: '#483A4B',
    orange: '#E46B1B',
    darkBrown: '#4F4051',
    lavendar: '#CFADD9',
    darkPurple: '#9D7CA6',
    grey: '#707070',
    darkGreen: '#4D9C73',
    lightGreen: '#CFF09E',
    progress: {
      100: "lavendar",
      500: "#4F4051",
    },
  },
  fonts: {
    body: "HK Grotesk Normal",
    heading: "HK Grotesk Normal",
    mono: "HK Grotesk Normal, sans-serif",
  },
  fontSizes: {
    xs: "13px",
    sm: "16px",
    md: "18px",
    lg: "24px",
    xl: "29px",
    "2xl": '48px',
    "5xl": "65px"
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "regular",
        fontFamily: "HK Grotesk Bold",
        fontSize: "29px",
        color: "navy",
        lineHeight: "37px",
        marginTop: '30px',
        marginBottom: '30px',
      }
    },
    Button: {
      sizes: {
        link: {
          h: '40px',
          w: '240px',
          borderRadius: '4px',
          bg: 'darkBrown',
          fontSize: 'sm',
          color: 'white'
        },
        linkLong: {
          h: '48px',
          w: '90%',
          borderRadius: '4px',
          bg: 'darkBrown',
          border: "2px solid",
          borderColor: "darkPurple",
          fontSize: 'sm',
          color: 'white'
        },
        xl: {
          h: '45px',
          w: '221px',
          borderRadius: '40px',
          border: "3px solid",
          borderColor: "darkPurple",
          bg: "darkBrown",
          fontSize: 'lg',
          color: 'white'
        },
        lg: {
          h: '59px',
          w: '262px',
          borderRadius: '40px',
          border: "3px solid",
          borderColor: "darkPurple",
          bg: "darkBrown",
          fontSize: '31px',
          color: 'white'
        },
        md: {
          h: '39px',
          w: '192px',
          borderRadius: '40px',
          border: "3px solid",
          borderColor: "darkPurple",
          bg: "darkBrown",
          fontSize: 'md',
          color: 'white'
        },
        sm: {
          h: '40px',
          w: '169px',
          borderRadius: '40px',
          border: "3px solid",
          borderColor: "blue",
          bg: "navy",
          fontSize: 'sm',
          color: 'white'
        },
        xs: {
          h: '40px',
          w: '142px',
          borderRadius: '40px',
          border: "3px solid",
          borderColor: "darkPurple",
          bg: "darkBrown",
          fontSize: 'xs',
          color: 'white'
        },
        "xxs": {
          md: {
            h: '39px',
            w: '151px',
            borderRadius: '40px',
            border: "2px solid",
            borderColor: "darkPurple",
            bg: "darkBrown",
            fontSize: 'sm',
            color: 'white'
          },
        },
        lp: {
          h: '56px',
          w: '264px',
          borderRadius: '40px',
          border: "3px solid",
          borderColor: "darkPurple",
          bg: "#BC83C6",
          fontSize: '21px',
          color: 'white'
        },
        lng: {
          w: '500px',
          h: '50px',
          borderRadius: '40px',
          border: "3px solid",
          borderColor: "darkPurple",
          bg: "darkBrown",
          fontSize: 'xs',
          color: 'white'
        }
      }
    }
  }
}

export default extendTheme(theme)
