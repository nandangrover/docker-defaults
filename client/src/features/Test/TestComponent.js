import React, { Component } from "react";
import { graphql } from 'react-apollo';
import { connect } from "react-redux";
import flowright from "lodash.flowright";
// Queries
import { QUIZES } from "../../graphql";

class TestComponent extends Component {
    renderList = () => {
        return this.props.name.map(name => {
            return (
                <div className="name" key={name.email}>{name.fname}</div>
            );
        })
    }

    renederQuizes = () => {
        if (!this.props.getQuizes.loading) {
            const { quizes } = this.props.getQuizes;

            return quizes.map(quiz => {
                return (
                    <div id="quiz">
                        <div className="id" key={quiz.id}>{quiz.id}</div>
                        <div className="authorName" key={quiz.authorName}>
                        <div className="shortDesc" key={quiz.shortDesc}></div>{quiz.shortDesc}</div>
                    </div>
                );
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div>Name List</div>
                <div>{this.renderList()}</div>
                <div>{this.renederQuizes()}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { name: state.name }
}

export default flowright(graphql(QUIZES, { name: "getQuizes" }), connect(mapStateToProps))(TestComponent);