import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

import Product from '../Product';

const ProductItems = ({ each, onAddToCart }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia 
                className={classes.media}
                image={each.media.source}
                title={each.name}
            />
            <CardContent>
                <div className={classes.CardContent}>
                    <Typography variant="h5" gutterBottom>
                        {each.name}
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        {each.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography
                    dangerouslySetInnerHTML={{ __html: each.description }}
                    variant="body2"
                    color="textSecondary"
                />
            </CardContent>
            <CardActions disableSpacing className={classes.CardActions}>
                <IconButton 
                    aria-label="Add to Cart"
                    onClick={() => {
                        onAddToCart(each.id, 1);
                    }}
                >
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default ProductItems;