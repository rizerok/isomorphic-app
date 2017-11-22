import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import style from './nav-burger.styl';

import { switchAside } from '../actions/aside';

class NavBurger extends React.Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        const {switchAside,open} = this.props;
        switchAside(!open);
    }
    render(){
        return (
            <button onClick={this.toggle}
                className={style.button}>
                <span className={classnames(
                    style.burger,
                    {
                        [style.isActive]:this.props.open
                    })
                }>
                    <span></span>
                </span>
            </button>
        );
    }
}

export default connect(
    state => state.asideMenu,
    dispatch => ({
        switchAside:(open)=>dispatch(switchAside(open))
    })
)(NavBurger);