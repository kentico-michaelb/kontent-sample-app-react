import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { selectedProjectCookieName } from './Utilities/SelectedProject';
import KontentSmartLink from '@kentico/kontent-smart-link'
import LocalizedApp from "./LocalizedApp";
import Switch from './Components/Switch';
import qs from 'qs';

class SmartLinkApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          kontentSmartLinkInit: null,
          editToggle: false,
          urlParams: null
        };
        this.editModeEnabled = process.env.REACT_APP_PREVIEW_API_KEY
        this.previewButton = this.previewButton.bind(this);
        this.smartLinkParam = "preview-mode"
      }

    previewButton(){
    if (this.state.editToggle) {
      const queryString = qs.parse(this.props.location)
      let searchArr = queryString.search.slice(1).split("&")
      let parsedParams = searchArr.filter(param => param !== this.smartLinkParam)

      this.setState({
        editToggle: false,
        urlParams: parsedParams.join("&")
      })
    }
    else {
      let currentParams = qs.parse(this.props.location).search
      let delimiter = "?"
      if(currentParams.length > 0) {
        delimiter = "&"
      }

      this.setState({
        editToggle: true,
        urlParams:currentParams + delimiter + this.smartLinkParam 
      });
    }
    }

    render() {
        return(
            <div>
                <LocalizedApp {...this.props} />
                {this.editModeEnabled && 
                  <Switch 
                  isOn={this.state.editToggle}
                  handleToggle={this.previewButton}
                />
                }
           </div>
        )
    }

    componentDidUpdate(prevProps, prevState){
      if(this.state.editToggle !== prevState.editToggle){
        this.props.history.push({
          search: this.state.urlParams
        })
      console.log(prevProps.location)
      }
    }
    componentDidMount(){
      if(this.props.location.search.includes(this.smartLinkParam)){
        this.setState({
          editToggle: true,
          urlParams: this.props.location.search
        })
      }

      if (this.editModeEnabled){
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
          kontentSmartLinkInit: result,
        })
      })
    }
    }
      componentWillUnmount(){
        if(this.state.kontentSmartLinkInit) {
          this.state.kontentSmartLinkInit.destroy();
        }
      }
}

export default withCookies(SmartLinkApp);