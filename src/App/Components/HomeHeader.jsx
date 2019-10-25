import React from 'react';
import { connect } from 'react-redux';

import UlList from './Elements/UlLlist';
import HeaderAnimation from './Elements/HeaderAnimation';
import {langChange, getMenus, getTranslations} from '../Redux/actions';

class HomeHeader extends React.Component{
    constructor(props){
		super(props);
		this.state = {
			phoneMenu : false
        }
        this.openMenu = this.openMenu.bind(this);
        this.langChangeFunc = this.langChangeFunc.bind(this);
    }
     
    langChangeFunc(lang){
        if(lang != this.props.config.lang) {
            this.props.langChange(lang);
            this.props.getTranslations(lang);
            this.props.getMenus(lang);
        }
    }

    openMenu(){
        this.setState({phoneMenu: !this.state.phoneMenu});
    }
    render() {
        return(
            <div>
            {(typeof this.props.menusList!= 'undefined')?
                <div>
                    <div id="menu">
                        <UlList 
                            menu={this.props.menusList.mainmenu.menujson} 
                            listClass='menu' 
                            icons={false} 
                            LangClicked = {this.langChangeFunc} 
                            config = {this.props.config}
                            langList= {this.props.langList}
                            languageData={this.props.translations}
                            />
                    </div>
                    
                    <div id="phonemenu">
                        <div className="menyunuach" onClick={this.openMenu}>{(this.state.phoneMenu)? this.props.translations['Close Menu'] : this.props.translations['Open Menu']}</div>
                        {(this.state.phoneMenu) ?
                        <UlList 
                            menu={this.props.menusList.mainmenu.menujson} 
                            listClass='phonemenu' 
                            icons={false} 
                            LangClicked = {this.langChangeFunc} 
                            config = {this.props.config}
                            langList= {this.props.langList}
                            languageData={this.props.translations}
                            />	
                            : ''}
                    </div>
                </div>
            : <div>Loading</div>}
                <HeaderAnimation />
                </div>
            )
    }

}

const mapStateToProps = store => {
    return {
        menusList: store.common.menusList,
        config: store.common.config,
        langList: store.common.langList,
        translations: store.common.translations,
    }
};
const mapDispatchToProps = dispatch => ({
    langChange: lang => dispatch(langChange(lang)),
    getTranslations: lang=>dispatch(getTranslations(lang)),
    getMenus: lang=>dispatch(getMenus(lang))
});

const HomeHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
export default HomeHeaderContainer;