import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography
                        component={Link}
                        to='/'
                        variant="h6"
                        className={classes.title}
                        color="inherit"
                    >
                        Commerce.js
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === "/" && (
                        <div className={classes.button}>
                            <IconButton
                                component={Link}
                                to="/cart"
                                aria-label="Show Items"
                                color="inherit"
                            >
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;