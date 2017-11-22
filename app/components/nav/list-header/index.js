import React from 'react';
import { BrowserRouter, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import style from './nav-list-header.styl';

class NavListHeader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let navList = null;
        if(this.props.list){
            navList = <ul className={style.list}>
                {this.props.list.map((n,i)=>(
                    <li key={i}>
                        <NavLink className={style.listItem}
                                 to={n.url}
                                 exact={n.url==='/'}
                                 activeClassName={classnames({
                                    [style.isActive]:this.props.active
                                 })}>
                            {n.title}
                        </NavLink>
                    </li>
                ))}
            </ul>;
        }
        return (
                <nav>
                    {navList}
                </nav>
        );
    }
}

export default withRouter(connect(
    ({primaryData:{nav:{list}}})=>({list:list.filter(n=>n.top)})
)(NavListHeader));