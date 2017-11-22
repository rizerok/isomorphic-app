import React from 'react';
import { connect } from 'react-redux';
import style from './page-default.styl';

import Page from '../classes/';

class PageDefault extends Page.Default{
    constructor(props){
        super(props);
    }
}

export default PageDefault;