import React from 'react';
import { connect } from 'react-redux';
import Side from '../Components/Side/Side';
import "./Layout.scss";

const styles = {
    darkModeActive:{backgroundColor:"#303030"}
}

const Layout = (props) => {
    const {dark,children} = props;
    return (
        <div style={dark ? styles.darkModeActive : null} className="layout-Container" >
        <Side />
        <div style={{width:"80%"}}>
            {children}
        </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        dark:state.AppReducer.DarkMode
    }
}

export default connect(mapStateToProps)(Layout);