import React from 'react';
import { connect } from 'react-redux';
import style from './page-default.styl';

import UiPreloader from 'components/ui/preloader';

class Default extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let content;
        if(this.props.page){
            content = (
                <div>
                    <div>{this.props.page.title}</div>
                    <div>{this.props.page.content}</div>
                </div>
            );
        }else{
            content = <UiPreloader />;
        }
        return (
            <div className={style.pageDefault}>
                {content}
            </div>
        );
    }
}

export default Default;