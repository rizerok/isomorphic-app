import React from 'react';

import style from './style.scss';

class RootFooter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={style.footer}>
                <div className="cnr-main">
                    footer
                </div>
            </div>
        );
    }
}

export default RootFooter;