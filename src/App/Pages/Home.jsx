import React, { Component } from 'react';
import HomeAbout from '../Components/HomeAbout';
import HomeHeader from '../Components/HomeHeader';
import HomeMyServices from '../Components/HomeMyServices';
import HomePortfolio from '../Components/HomePortfolio';
import HomeBlog from '../Components/HomeBlog';
import WorkedWith from '../Components/WorkedWith';
import {getCategory, getPost, getPostList} from '../Redux/actions';

class Home extends Component{

	static async getInitialProps({match, history, location, store, ...ctx }) {
        const homeData = await Promise.all([
            await store.dispatch(getPost(match.params.lang , 'farhad-aliyev_53')),
            await store.dispatch(getPostList(match.params.lang, 'designer-skills')),
            await store.dispatch(getPostList(match.params.lang, 'programming-skills')),
            await store.dispatch(getCategory(match.params.lang, 'services')),
            await store.dispatch(getPostList(match.params.lang, 'services')),
            
            await store.dispatch(getCategory(match.params.lang, 'portfolio')),
            await store.dispatch(getPostList(match.params.lang, 'portfolio')),

            await store.dispatch(getCategory(match.params.lang, 'blog')),
            await store.dispatch(getPostList(match.params.lang, 'blog')),

            await store.dispatch(getCategory(match.params.lang, 'i-work-with')),
            await store.dispatch(getPostList(match.params.lang, 'i-work-with')),
        ]).then(async response => {
            return store.getState();
        });
        return homeData;
    }
    
    render() {
        return(
            <div className="wrapper">
                <HomeHeader />
                <HomeAbout />
                <HomeMyServices />
                <HomePortfolio />
                <HomeBlog />
                <WorkedWith /> 
            </div>
        )
    }
}
export default Home;