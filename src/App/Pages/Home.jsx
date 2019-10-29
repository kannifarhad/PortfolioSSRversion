import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeAbout from '../Components/HomeAbout';
import HomeHeader from '../Components/HomeHeader';
import HomeMyServices from '../Components/HomeMyServices';
import HomePortfolio from '../Components/HomePortfolio';
import HomeBlog from '../Components/HomeBlog';
import WorkedWith from '../Components/WorkedWith';
import {getCategory, getPost, getPostList} from '../Redux/actions';
import Helmet from "react-helmet";

class Home extends Component{

	static async getInitialProps({match, history, location, store, ...ctx }) {
        const state = store.getState();
        const lang = state.common.config.lang;
        const homeData = await Promise.all([
            await store.dispatch(getPost(lang , 'farhad-aliyev_53')),
            await store.dispatch(getPostList(lang , 'designer-skills')),
            await store.dispatch(getPostList(lang , 'programming-skills')),
            await store.dispatch(getCategory(lang, 'services')),
            await store.dispatch(getPostList(lang, 'services')),
            
            await store.dispatch(getCategory(lang, 'portfolio')),
            await store.dispatch(getPostList(lang, 'portfolio')),

            await store.dispatch(getCategory(lang, 'blog')),
            await store.dispatch(getPostList(lang, 'blog')),

            await store.dispatch(getCategory(lang, 'i-work-with')),
            await store.dispatch(getPostList(lang, 'i-work-with')),
        ]).then(async response => {
            return store.getState();
        });
        return homeData;
    }
    
    render() {
        let currentLang = this.props.langList.filter(lang => { return lang.slug == this.props.config.lang})[0];
        return(
            <React.Fragment>
                <Helmet encodeSpecialCharacters={true}>
                    <title>{currentLang.sitetitle}</title>
                    <meta name="description" content={currentLang.description} />
                </Helmet>
                <div className="wrapper">
                    <HomeHeader />
                    <HomeAbout />
                    <HomeMyServices />
                    <HomePortfolio />
                    <HomeBlog />
                    <WorkedWith /> 
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (store, ownProps) => {
    return {
		config : store.common.config,
        languageData: store.common.translations,
        posts : store.posts,
        langList: store.common.langList,
        categories: store.categories,
        store,
        ...ownProps
    }
};

const HomeContainer = connect(mapStateToProps, null)(Home);
export default HomeContainer;