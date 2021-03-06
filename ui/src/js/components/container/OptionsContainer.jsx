import browser from "webextension-polyfill";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class OptionsContainer extends Component {
    constructor() {
        super();
        this.state = {
            whitelist: []
        };
        this.onRemove = this.onRemove.bind(this);
    }

    restore(){
        browser.storage.sync.get('whitelist')
            .then((result) => {
                this.setState({
                    whitelist: result.whitelist || []
                });
            });
    }

    componentDidMount() {
        this.restore()
    }

    onRemove(index) {
        const { whitelist } = this.state;

        browser.storage.sync.set({
            whitelist: [...whitelist.slice(0, index), ...whitelist.slice(index + 1)]
        }).then(() => {
            this.restore()
        });
    }

    render() {
        const { whitelist } = this.state;
        return (
            <>
                <div className="page-container">
                    <h1>Once <span>a</span> day</h1>

                    <h2>Whitelist</h2>
                    <p>Multiple visits per day available for websites below</p>
                    <ul>
                        {whitelist.map((value, index) => (
                            <li key={`item-${index}`}>
                                {value}
                                <button onClick={() =>
                                    this.onRemove(index)
                                }>Remove</button>
                            </li>)
                        )}
                    </ul>
                </div>
                <div className="credit-container">
                    Background by <a href="https://ellenportin.myportfolio.com/" target="_blank">Ellen Portin</a>
                </div>
            </>
        );
    }
}

export default OptionsContainer;

const wrapper = document.getElementById("options-container");
wrapper ? ReactDOM.render(<OptionsContainer />, wrapper) : false;