import React from "react";
import ReactDOM from "react-dom";

import BoyerMoore from "./boyerMoore";
import SearchForm from "./SearchForm";
import SearchVisualization from "./SearchVisualization";

class SearchDemo extends React.Component {
    constructor() {
        super();
        this.handleHaystackAndNeedleSubmit = this.handleHaystackAndNeedleSubmit.bind(this);
    }

    componentWillMount() {
        const haystack = "Here is a simple example.";
        const needle = "example";
        this.handleHaystackAndNeedleSubmit(haystack, needle);
    }

    handleHaystackAndNeedleSubmit(haystack, needle) {
        this.setState({
            haystack: haystack,
            needle: needle,
            badCharTable: BoyerMoore.makeBadCharTable(needle),
            goodSuffixTable: BoyerMoore.makeGoodSuffixTable(needle),
            actions: BoyerMoore.search(needle, haystack).log,
        });
    }

    render() {
        return (
            <div>
                <SearchForm onHaystackAndNeedleSubmit={this.handleHaystackAndNeedleSubmit} />
                <SearchVisualization key={this.state.haystack + this.state.needle} data={this.state} />
            </div>
        );
    }
}

ReactDOM.render(
    <SearchDemo />,
    document.getElementById("demo")
);