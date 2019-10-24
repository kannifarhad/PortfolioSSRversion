import React from 'react';
import {getCategory, getCategoryList, getPost, getPostList} from '../Redux/actions';
import { connect } from 'react-redux';
// import OwlCarousel from 'react-owl-carousel';

class WorkedWithContainer extends React.Component {
    constructor(props){
		super(props);
		this.state = {
			workedWithInfo : this.props.categories['i-work-with'],
            partners: (typeof this.props.posts['i-work-with'] != 'undefined') ? this.props.posts['i-work-with'].postslist : [],
            category: 'i-work-with',
            hasError:false,
            options: {
                loop: true,
                margin: 0,
                nav:false,
                responsive:{
                    0: {
                        items: 1,
                    },
                    600: {
                        items: 3,
                    },
                    1000: {
                        items: 3,
                    },
                },
            }
        }

    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.category != this.state.category || prevProps.config.lang != this.props.config.lang ) {
            this.props.getCategory(this.props.config.lang , this.state.category).then( response => {
				this.setState({
					workedWithInfo: this.props.store.categories[this.state.category] 
				});
			});
            this.props.getPostList(this.props.config.lang,  this.state.category).then( response => {
				this.setState({
					partners: this.props.store.posts[this.state.category] 
				});
			});
        }
        

    }
    componentDidUpdate(){
        if(this.state.workedWithInfo == undefined) {
			this.props.getCategory(this.props.config.lang , this.state.category).then( response => {
				this.setState({
					workedWithInfo: this.props.store.categories[this.state.category] 
				});
			});
		}

		if(this.state.partners.length == 0) {
			this.props.getPostList(this.props.config.lang,  this.state.category).then( response => {
				this.setState({
					partners: this.props.store.posts[this.state.category].postslist
				});
			});
        }
    }
    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
        return(
            <div id="workedwith">
                <div className="workedhead">
                {(typeof(this.state.workedWithInfo) != 'undefined')?
                    <React.Fragment>
                        <h1>{this.state.workedWithInfo.title}</h1>
                        <p>{this.state.workedWithInfo.description}</p>
                    </React.Fragment>
                : ""}
                </div>
    
                <div className="workwith">
                    <div className="logos">
                    {(typeof(this.state.partners) != 'undefined')?
                        <div></div>
                        // <OwlCarousel className="owl-theme" {...this.state.options} >
                        //     {this.state.partners.postslist.map(partner => 
                        //     <a className={"item"} key={partner.id} href={partner.shortstory} target="_blank" alt={partner.title}><img className="svg" src={partner.thumb_image} /></a>
                        //     )}
                        // </OwlCarousel>
                         : ""}
                    </div>
                    
                </div><div className="clear"></div>
            </div>
        )
    }
    
}

const mapStateToProps = (store, ownprops) => {
    return {
        config: store.common.config,
		languageData: store.common.translations,
        posts : store.posts,
        categories: store.categories,
        store,
        ...ownprops, 
    }
};

const mapDispatchToProps = dispatch => ({
	getCategory: (lang, slug) => dispatch(getCategory(lang, slug)),
	getPost: (lang, slug) => dispatch(getPost(lang, slug)),
	getPostList: (lang, slug) => dispatch(getPostList(lang, slug)),
	getCategoryList: (lang) => dispatch(getCategoryList(lang))
});

const WorkedWith = connect(mapStateToProps, mapDispatchToProps)(WorkedWithContainer);

export default WorkedWith;