import React from 'react';

import style from './root-footer.styl';

import NavListFooter from 'components/nav/list-footer';

class RootFooter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {site_info} = this.props.company;
        return (
            <div className={style.footer}>
                <NavListFooter />
                <div>{site_info}</div>
            </div>
        );
    }
}

export default RootFooter;