import React from "react"
import Head from "next/head"
import { AppProps } from "next/app"
import { ThemeProvider } from "@material-ui/styles"
import { CssBaseline } from "@material-ui/core"
import { quioeaTheme } from "~/src/theme"

import { NavBar } from "~/components/NavBar"

import "../styles/globals.css"

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={quioeaTheme}>
        <NavBar />
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
