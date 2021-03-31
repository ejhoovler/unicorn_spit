import React from 'react';
import { Grid } from '@material-ui/core';
import ProductItems from './ProductItems/ProductItems';
import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {product.map((each, index) => {
                    return (
                        <Grid item key={each?.id} xs={12} sm={6} md={4} lg={3}>
                            <ProductItems each={each} onAddToCart={onAddToCart} />
                        </Grid>
                    );
                })}
            </Grid>
        </main>
    );
};

export default Product;