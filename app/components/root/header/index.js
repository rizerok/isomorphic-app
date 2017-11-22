import React from 'react';
import style from './root-header.styl';
import { Provider } from 'react-redux';

import NavListHeader from 'components/nav/list-header';
import NavBurger from 'components/nav/burger';
import Logo from 'components/ui/logo';


class RootHeader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {phone} = this.props.company;
        return (
            <div className={style.header}>
                <Logo />
                <NavListHeader
                    nav={this.props.nav}
                    active
                />
                <NavBurger />
                <a href={`tel:${phone}`}>{phone}</a>
            </div>
            
        );
    }
}

export default RootHeader;