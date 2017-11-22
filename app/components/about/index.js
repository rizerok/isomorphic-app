import React from 'react';

import style from './about.styl';

import Page from 'components/page/classes';
import UiPreloader from 'components/ui/preloader';

class About extends Page.Default{
    constructor(props){
        super(props);
    }
    render(){
        let content;
        if(this.props.page){
            content = (
                <div>
                    <div>ABOUT YEAH</div>
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

export default About;