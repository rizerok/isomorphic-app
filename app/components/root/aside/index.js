import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import style from './root-aside.styl';

import {
    switchAside,
    addCloseEventFn
} from 'components/nav/actions/aside';
import NavListAside from 'components/nav/list-aside';

class RootAside extends React.Component{
    constructor(props){
        super(props);
        
        this.closeOnNotElement = this.closeOnNotElement.bind(this);
    }
    closeOnNotElement(e){
        if(e.target !== this.element && !this.element.contains(e.target)){
            this.props.switchAside(false,this.closeOnNotElement);
        }
    }
    componentWillReceiveProps({asideMenu:{open,eventFn}}){
        if(open && this.closeOnNotElement!==eventFn){
            this.props.addCloseEventFn(this.closeOnNotElement);
        }
    }
    render(){
        return (
            <aside
                ref={(aside) => {this.element = aside;}}
                className={classnames(
                style.container,
                {
                    [style.isActive]:this.props.asideMenu.open
                })
            }>
                <NavListAside />
            </aside>
        );
    }
}

export default connect(
    ({asideMenu}) => ({
        asideMenu
    }),
    dispatch => ({
        switchAside:(open,eventFn)=>dispatch(switchAside(open,eventFn)),
        addCloseEventFn:(fn)=>dispatch(addCloseEventFn(fn))
    }))(RootAside);
