import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import style from './root-layout.scss';
import RootHeader from '../header';
import RootFooter from '../footer';
import MainRouter from 'components/main-router';

class RootLayout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={style.container}>
                <div className={classnames(style.layout)}>
                    <header className={style.header}>
                        <RootHeader/>
                    </header>
                    <main className={style.main}>
                        <MainRouter/>
                    </main>
                    <footer className={style.footer}>
                        <RootFooter/>
                    </footer>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(
    state => {
        return state;
    }
)(RootLayout));