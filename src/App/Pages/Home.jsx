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
            await store.dispatch(getPost('en' , 'farhad-aliyev_53')),
            await store.dispatch(getPostList('en', 'designer-skills')),
            await store.dispatch(getPostList('en', 'programming-skills')),
            await store.dispatch(getCategory('en', 'services')),
            await store.dispatch(getPostList('en', 'services')),
            
            await store.dispatch(getCategory('en', 'portfolio')),
            await store.dispatch(getPostList('en', 'portfolio')),

            await store.dispatch(getCategory('en', 'blog')),
            await store.dispatch(getPostList('en', 'blog')),

            await store.dispatch(getCategory('en', 'i-work-with')),
            await store.dispatch(getPostList('en', 'i-work-with')),
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