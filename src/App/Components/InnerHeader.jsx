import React from 'react';
import UlList from './Elements/UlLlist';
import { connect } from 'react-redux';
import {langChange, getMenus, getTranslations} from '../Redux/actions';

function InnerHeader(props) {
    function langChangeFunc(lang){
        if(lang != props.config.lang) {
            props.langChange(lang);
            props.getTranslations(lang);
            props.getMenus(lang);
        }
    }
    return(
        <div className="projectinsidehead">
            <div className="headertop">
                <div className="logoname"><span>Kanni Farhad</span></div>
                {(typeof props.menusList!= 'undefined')?
                <div className="headermenu">
                    <UlList 
                        menu={props.menusList.insidemenu.menujson} 
                        listClass='headmenu' 
                        icons={true} 
                        LangClicked = {langChangeFunc} 
                        config = {props.config}
                        langList= {props.langList}
                        languageData={props.translations}
                        />
                </div>
                : <div>Loading</div>}
            <div className="clear"></div>
            </div>
        </div>
    )
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

const InnerHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(InnerHeader);
export default InnerHeaderContainer;