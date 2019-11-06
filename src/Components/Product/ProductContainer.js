import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';


import CategoriesList from './Categories/CategoriesList';
import ProductList from './Products/ProductList';
import MaterialList from './Materials/MaterialList';

import { productActions } from '../../Actions/productActions';


class ProductContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCategoryId: '',
            selectedProductId: ''
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(productActions.getAllCategories());
    }

    selectCategoriesHandler = (id) => {
        this.setState({
            ...this.state,
            selectedCategoryId: id
        })
    }

    selectProductsHandler = (id) => {
        this.setState({
            ...this.state,
            selectedProductId: id
        })
    }

    render() {
        const { classes, products } = this.props;
        const { categories } = products;

        const { selectedCategoryId, selectedProductId } = this.state;

        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CategoriesList 
                            onClickCard={this.selectCategoriesHandler} 
                            categories={categories}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <ProductList 
                            categoryId={selectedCategoryId} 
                            onSelectProduct={this.selectProductsHandler}
                        />
                        <MaterialList productId={selectedProductId} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
    },

    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary
    }
});


ProductContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        products: state.product
    };
}

const connectedHomePage = withRouter(connect(mapStateToProps, null, null, 
    {
        pure: false
    }
)(withStyles(styles)(ProductContainer)));

export { connectedHomePage as ProductContainer };
