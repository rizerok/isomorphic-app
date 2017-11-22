import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

class Provider extends React.Component{
    constructor(props){
        super(props);
        this.page = props.page || null;
        this.slug = props.slug;
    }
    getPage(){
        this.props.getPage(this.slug);
    }
    componentWillMount(){
        this.getPage();
    }
    componentWillReceiveProps({page,slug}){
        //for dynamic
        if(this.slug !== slug){//change slug
            this.slug = slug;//set new slug
            this.getPage();//action -> fetch
        }else{
            this.slug = slug;
        }
        this.page = page;
    }
    // render(){
    //     return (
    //         <PageDefault page={this.page}/>
    //     );
    // } 
}

export default Provider;