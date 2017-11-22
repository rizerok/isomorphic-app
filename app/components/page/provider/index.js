import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { getPage } from '../actions/page';

import Page from '../classes';
import PageDefault from '../default';

class PageProvider extends Page.Provider{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <PageDefault page={this.page}/>
        );
    }
}

export default withRouter(connect(
    (state,ownProps) => {
        //always first, complete props, current state
        const {slug} = ownProps.match.params;
        const {list} = state.pages;
        return {
            page:list.find(p=>p.slug===slug),
            slug
        };
    },
    dispatch  => ({
        getPage: (slug) => {
            dispatch(getPage(slug));
        }
    })
)(PageProvider));