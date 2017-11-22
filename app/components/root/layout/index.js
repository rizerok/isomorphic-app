import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import style from './root-layout.styl';
import RootHeader from '../header';
import RootFooter from '../footer';
import MainRouter from 'components/main-router';
import UiPreloader from 'components/ui/preloader';
import RootAside from '../aside';

class RootLayout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {primaryData:{state,company},currentState} = this.props;
        const loading = state.isFetching || currentState.isFirstFetch;
        return (
            <div className={style.container}>
                <RootAside />
                <div className={classnames(
                    style.layout,
                    {
                        [style.isLoading]:loading,
                        [style.isLoaded]:!loading
                    })}>
                    <header className={style.header}>
                        <RootHeader company={company} />
                    </header>
                    <main className={style.main}>
                        <MainRouter></MainRouter>
                    </main>
                    <footer className={style.footer}>
                        <RootFooter company={company} />
                    </footer>
                </div>
                {loading?(<UiPreloader fixed={true} />):null}
            </div>
        );
    }
}

export default withRouter(connect(
    state => {
        return state;
    }
)(RootLayout));