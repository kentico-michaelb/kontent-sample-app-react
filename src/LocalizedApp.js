import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TranslatorProvider } from 'react-translate';
import { withCookies } from 'react-cookie';

import App from './App';
import {
  languageCodes,
  languageCodesLowerCase,
  getLanguageCode
} from './Utilities/LanguageCodes';
import { localizationObject } from './Utilities/LocalizationLoader';
import { selectedProjectCookieName } from './Utilities/SelectedProject';

import KontentSmartLink from '@kentico/kontent-smart-link'
import Switch from './Components/Switch';

class LocalizedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: getLanguageCode(props.match),
      kontentSmartLinkInit: null,
      editToggle: false
    };
    this.setLanguageCode = this.setLanguageCode.bind(this);
    this.previewButton = this.previewButton.bind(this);
    this.smartLinkParam = "preview-mode"
  }

  previewButton(){
    if (this.state.editToggle === true) {
      this.setState({editToggle: false});
      this.props.history.replace({
        pathname: this.props.history.location.pathname,
        search: ""
      })
    }
    else {
      this.setState({editToggle: true});
      this.props.history.push(`?${this.smartLinkParam}`);
    }
  }

  setLanguageCode(newLanguage, newUrl) {
    if (
      this.state.language === newLanguage ||
      languageCodes.indexOf(newLanguage) < 0
    ) {
      return;
    }

    const urlParts = this.props.location.pathname.split('/');
    const currentLanguage = this.props.location.pathname.split('/')[1];
    if (languageCodesLowerCase.indexOf(currentLanguage) > -1) {
      urlParts[1] = newLanguage;
    } else {
      urlParts.splice(1, 0, newLanguage);
    }

    this.setState({
      language: newLanguage
    });
    if (newUrl) {
      this.props.history.push(urlParts.splice(0, 2).join('/') + newUrl);
    } else {
      this.props.history.push(urlParts.join('/'));
    }
  }

  render() {
    if (
      this.props.location.pathname !==
      this.props.location.pathname.toLowerCase()
    ) {
      return <Redirect to={this.props.location.pathname.toLowerCase()} />;
    }
    return (
      <div>
        <TranslatorProvider
          translations={localizationObject[this.state.language]}
        >          
        <Switch 
          isOn={this.state.editToggle}
          handleToggle={this.previewButton}
         />
          <App
            {...this.props}
            language={this.state.language}
            changeLanguage={this.setLanguageCode}
            editToggle={this.state.editToggle}
          />

        </TranslatorProvider>
      </div>
    );
  }

  componentDidMount(){
    const projectId = this.props.cookies.get(selectedProjectCookieName)
    const lang = this.props.language
    KontentSmartLink.initializeOnLoad({
      debug: true,
      defaultDataAttributes: {
        projectId: projectId,
        languageCodename: lang,
      },
      queryParam: this.smartLinkParam
    }).then(result => {
      this.setState({
        kontentSmartLinkInit: result
      })
    })
    if(this.props.history.location.search === `?${this.smartLinkParam}`){
      this.setState({editToggle:true})
    }
  }
  componentWillUnmount(){
    if(this.state.kontentSmartLinkInit) {
      this.state.kontentSmartLinkInit.destroy();
    }
  }
}

export default withCookies(LocalizedApp);
