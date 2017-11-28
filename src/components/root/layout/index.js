import React from 'react';
import { renderRoutes } from 'react-router-config';

import style from './style.scss';

class RootLayout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={style.container}>
                <header className={style.header}>
                    header
                </header>
                <main className={style.main}>
                    {renderRoutes(this.props.route.routes)}
                </main>
                <footer className={style.footer}>
                    footer
                </footer>
            </div>
        );
    }
}

export default RootLayout;