import { Global } from '@emotion/react'
import React from 'react'

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: "Fira Sans Extra Bold";
        src: url("./fonts/FiraSans-ExtraBold.ttf") format("ttf");
        /* font-weight: 800; */
      }

      @font-face {
        font-family: "Fira Sans Medium";
        src: url("./fonts/FiraSans-Medium.ttf") format("ttf");
      }

      `}
  />
)

export default Fonts
