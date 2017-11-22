import React from 'react';

import style from './root-footer.scss';

class RootFooter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={style.footer}>
                footer
            </div>
        );
    }
}

export default RootFooter;