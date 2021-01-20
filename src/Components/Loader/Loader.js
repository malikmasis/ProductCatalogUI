import React, { Component } from "react";
import "./Loader.css";
import { connect } from "react-redux";

class Loader extends Component {
  render() {
    const { loading } = this.props.loading;

    if (!loading) return null;
    return (
      <div className="loader-container">
        <div id="cupcake" className="box">
          <span className="letter">L</span>

          <div className="cupcakeCircle box">
            <div className="cupcakeInner box">
              <div className="cupcakeCore box"></div>
            </div>
          </div>
          <span className="letter box">A</span>
          <span className="letter box">D</span>
          <span className="letter box">I</span>
          <span className="letter box">N</span>
          <span className="letter box">G</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ loading: state.LoaderStateReducer });

export default connect(mapStateToProps)(Loader);
