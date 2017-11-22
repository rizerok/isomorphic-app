import React from 'react';
import style from './root-header.scss';

class RootHeader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={style.header}>
                header
            </div>
            
        );
    }
}

export default RootHeader;