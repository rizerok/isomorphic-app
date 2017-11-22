import React from 'react';
import classnames from 'classnames';

import style from './ui-preloader.styl';

export default  (props) => {
    let rings = [];
    for(let i = 0;i<4;i++){
        rings.push(<div className={style.ring} key={i}></div>);
    }
    
    return (
    <div className={classnames(
    style.container,
        {
            [style.fixed]:props.fixed
        })}>
        {rings}
    </div>);
};