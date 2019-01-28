import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { sampleText } from './sampleText'
import marked from 'marked'
class App extends Component {

  state = {
    text: sampleText
  }
  componentDidMount() {
    const text = localStorage.getItem('text');
    if (text) {
      this.setState({ text });
    } else {
      this.setState({ text: sampleText });

    }
  }
  componentDidUpdate() {
    const { text } = this.state
    localStorage.setItem('text', text)

  }
  handlechange = event => {
    const text = event.target.value
    this.setState({ text })
  }
  renderText = text => {
    const __html = marked(text, { sanitize: true })
    return { __html }
  }
  render() {
    return (
      <div className="container">
        Write your markdown here:
        <div className="row">
          <div className="col-sm-6">
            <textarea
              className='form-control'
              rows="15"
              value={this.state.text}
              onChange={this.handlechange} />
          </div>
          <div className="col-sm-6">
            <h1>Rendred Text</h1>
            <div className="result" dangerouslySetInnerHTML={this.renderText(this.state.text)}></div>
          </div>
        </div>
        <div className="gh-ribbon"><a href="https://github.com/fakhrovski/markdown" target="_blank" className="github">Fork me on Github</a></div>
      </div>
    );
  }
}

export default App;
