import * as React from 'react';
import { Link, Route  } from 'react-router-dom';
import clsx from 'clsx';
import { AppBar, Toolbar, IconButton, Typography, createStyles, makeStyles, Theme, CssBaseline, Divider, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useTheme } from '@material-ui/core';
import BookListContainerComponent from '../containers/BookListContainerComponent';
import Home from './Home';
import BookCreateContainerComponent from '../containers/BookCreateContainerComponent';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

export default function NavMenu() {
        const classes = useStyles();
        const theme = useTheme();
        const [open, setOpen] = React.useState(false);

        const handleDrawerOpen = () => {
            setOpen(true);
          };
        
        const handleDrawerClose = () => {
            setOpen(false);
        };

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                  position="fixed"
                  className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                  })}
                >
                  <Toolbar>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      className={clsx(classes.menuButton, open && classes.hide)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                      Book Store
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Drawer
                  className={classes.drawer}
                  variant="persistent"
                  anchor="left"
                  open={open}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                  </div>
                  <Divider />
                  <List>
                    <ListItem button component={Link} to="/books" key={'Books'}>
                        <ListItemText primary={'Books'}  />
                    </ListItem>
                    <ListItem button component={Link} to="/books/create" key={'Create book'}>
                        <ListItemText primary={'Create book'}  />
                    </ListItem>
                  </List>
                </Drawer>
                <main
                className={clsx(classes.content, {
                  [classes.contentShift]: open,
                })}
              >
                 <div className={classes.drawerHeader} />
                        <Route exact path='/' component={Home} />
                        <Route exact path='/books' component={BookListContainerComponent} />
                        <Route exact path='/books/create' component={BookCreateContainerComponent} />
              </main>
          </div>
        );
}
