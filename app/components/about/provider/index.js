import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { getPage } from 'components/page/actions/page';

import Page from 'components/page/classes';
import About from '../index';

class AboutProvider extends Page.Provider{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <About page={this.page}/>
        );
    }
}

export default withRouter(connect(
    (state,ownProps) => {
        //always first
        const slug = 'about';
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
)(AboutProvider));