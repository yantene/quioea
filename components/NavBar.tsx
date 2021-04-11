import React from "react"
import {
  AppBar,
  Avatar,
  Badge,
  createStyles,
  IconButton,
  makeStyles,
  StylesProvider,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core"
import * as Icons from "@material-ui/icons"

export const NavBar = () => {
  const classes = navBarStyle()

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <Icons.Menu />
        </IconButton>
        <img src="/logo.svg" alt="quioea logo" className={classes.logo} />
        <div className={classes.grow} />
        <IconButton aria-label="show 17 new mails" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <Icons.Notifications />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar alt="Place Holder" src="https://via.placeholder.com/512" />
          {/* <Icons.AccountCircle /> */}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

const navBarStyle = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    logo: {},
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  }),
)
