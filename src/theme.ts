import { createMuiTheme } from "@material-ui/core"
import { grey, red } from "@material-ui/core/colors"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const quioeaColors = {
  primary: "hsl(166, 37.1%, 65.1%)",
  secondary: "hsl(359, 58.3%, 68.0%)",
  third: "hsl(52, 83.8%, 61.4%)",
}

export const quioeaTheme = createMuiTheme({
  palette: {
    primary: { main: grey.A400 },
    secondary: { main: red.A100 },
    error: { main: red.A400 },
    background: { default: "hsl(40, 50%, 96%)" },
  },
})
