import React, {Component} from 'react';
import Modal from './Modal';
import marked from 'marked';

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markdownContent: props.markdownContent
    };

    this.updateMarkdown = this.updateMarkdown.bind(this);
    this.reset = this.reset.bind(this);
    this.update = this.update.bind(this);
    this.back = this.back.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({markdownContent: nextProps.markdownContent});
  }

  reset() {
    this.setState({markdownContent: this.props.markdownContent});
  }

  update() {
    this.props.update(this.state.markdownContent);
  }

  back() {
    this.props.back();
  }

  updateMarkdown(e) {
    this.setState({markdownContent: e.target.value});
  }

  render() {
    const markdownContent = this.state.markdownContent;
    return (
      <Modal forceWidth="90%" show={true}>
        <div className="markdown-editor">
          <div className="edit-section">
            <h3>Enter Markdown</h3>
            <textarea onChange={this.updateMarkdown} value={markdownContent}/>
            <span>Learn about
                <a
                  target="_blank"
                  href="https://guides.github.com/features/mastering-markdown">
                  Markdown
                </a>
              </span>
          </div>

          <div className="render-section">
            <h3>Rendered Markdown</h3>
            <div className="rendered" dangerouslySetInnerHTML={{__html: marked(markdownContent)}}/>
          </div>

          <div className="button-holder">
            <button className="button update" onClick={this.update}>Update</button>
            <button className="button reset" onClick={this.reset}>Reset</button>
            <button className="button back" onClick={this.back}>Back</button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default MarkdownEditor;
