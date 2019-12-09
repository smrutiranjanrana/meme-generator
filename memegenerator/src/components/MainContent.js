import React from 'react';

class MainContent extends React.Component {
    constructor() {
        super();
        this.state = {
            memes: [],
            currentMemeURL: '',
            topLabel: '',
            bottomLabel: ''
        };

        this.handelRandomMeme = this.handelRandomMeme.bind(this);
        this.handelLabels = this.handelLabels.bind(this);
    }

    async componentDidMount() {
        const res = await fetch('https://api.imgflip.com/get_memes');
        const data = await res.json();

        this.setState({
            memes: data['data']['memes']
        });

        this.handelRandomMeme();
    }

    handelRandomMeme() {
        let randomValue = Math.floor(Math.random() * this.state.memes.length);

        this.setState(prevState => {
            const newMemeURL = prevState.memes[randomValue]['url'];

            return {
                currentMemeURL: newMemeURL
            };
        });
    }

    handelLabels(event) {
        const {name, value} = event.target;

        this.setState({
            [name]: value 
        });
    }

    render() {
        return (
            <main>
                <div className="row">
                    <div className="col s12 m4 l4 offset-m4 offset-l4">
                        <div className="card">
                            <div className="card-image">
                                <img
                                    alt="meme"
                                    src={this.state.currentMemeURL}
                                />
                                <h4 className="topLabelText">
                                    {this.state.topLabel}
                                </h4>
                                <h4 className="bottomLabelText">
                                    {this.state.bottomLabel}
                                </h4>
                            </div>
                            <div
                                className="card-content"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <div className="row">
                                    <div className="col">
                                        <input
                                            type="text"
                                            name="topLabel"
                                            placeholder="Top label"
                                            value={this.state.topLabel}
                                            onChange={this.handelLabels}
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            name="bottomLabel"
                                            placeholder="Bottom label"
                                            value={this.state.bottomLabel}
                                            onChange={this.handelLabels}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="card-action center">
                                <button
                                    className="btn waves-effect waves-light"
                                    onClick={this.handelRandomMeme}
                                >
                                    Random meme
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default MainContent;
