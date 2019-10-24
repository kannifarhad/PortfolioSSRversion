import React, { Component } from 'react';
import Skills from './Elements/HomeSkills';
import {connect} from 'react-redux';
import {getCategory, getPost, getPostList} from '../Redux/actions';

class HomeAbout extends Component {
	constructor(props){
		super(props);
		this.state = {
			aboutMe: this.props.posts['farhad-aliyev_53'],
			designerSkills: this.props.posts['designer-skills'],
			programmerSkills: this.props.posts['programming-skills'],
		}

		if(this.state.aboutMe == undefined) {
			this.props.getPost(this.props.config.lang , 'farhad-aliyev_53').then( response => {
				this.setState({
					aboutMe: this.props.store.posts['farhad-aliyev_53'] 
				});
			});
		}
		
		if(this.state.designerSkills == undefined) {
			this.props.getPostList(this.props.config.lang, 'designer-skills').then( response => {
				this.setState({
					designerSkills: this.props.store.posts['designer-skills'] 
				});
			});
		}

		if(this.state.programmerSkills == undefined) {
			this.props.getPostList(this.props.config.lang, 'programming-skills').then( response => {
				this.setState({
					programmerSkills: this.props.store.posts['programming-skills'] 
				});
			});
		}
	}

	returnFullstory(){
		return { __html :this.state.aboutMe.fullstory}
	}

	componentDidUpdate(prevProps, prevState){
        if(prevProps.config.lang != this.props.config.lang) {

			this.props.getPost(this.props.config.lang , 'farhad-aliyev_53').then( response => {
				this.setState({
					aboutMe: this.props.store.posts['farhad-aliyev_53'] 
				});
			});
			
			this.props.getPostList(this.props.config.lang, 'designer-skills').then( response => {
				this.setState({
					designerSkills: this.props.store.posts['designer-skills'] 
				});
			});

			this.props.getPostList(this.props.config.lang, 'programming-skills').then( response => {
				this.setState({
					programmerSkills: this.props.store.posts['programming-skills'] 
				});
			});
        }
	}
	
	
	render() {
		return(
			<div id="aboutme">
				 <div className="aboutmecircles"><div className="photo"></div></div>
				 {(typeof this.state.aboutMe != 'undefined') ? 
					<div className="name">
						<span>{this.state.aboutMe.title}</span>
						<p className="profession">{this.state.aboutMe.shortstory}</p>
						<div className="aboutext"  dangerouslySetInnerHTML={this.returnFullstory()}></div>
						<div className="clear"></div> 
					</div>
					: ''}
				 {(typeof this.state.programmerSkills != undefined && this.state.designerSkills != undefined) ? 
					<Skills /> 
				: ''}
			</div>
			)
	}
    
}



const mapStateToProps = (store, ownProps) => {
    return {
		config : store.common.config,
		posts: store.posts,
        store,
        ...ownProps
    }
};

const mapDispatchToProps = dispatch => ({
	getCategory: (lang, slug) => dispatch(getCategory(lang, slug)),
	getPost: (lang, slug) => dispatch(getPost(lang, slug)),
	getPostList: (lang, slug) => dispatch(getPostList(lang, slug)),
});

const HomeAboutContainer = connect(mapStateToProps, mapDispatchToProps)(HomeAbout);

export default HomeAboutContainer;