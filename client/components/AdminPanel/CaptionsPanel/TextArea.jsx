import React, {Component} from 'react';

// class TextArea extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       value: props.value
//     };
//   }
//
//   componentWillReceiveProps(nextProps) {
//     console.log(nextProps);
//   }
//
//   render() {
//     return (
//       <textarea
//         readOnly={this.props.readOnly}
//         onChange={e => this.setState({value: e.target.value})}
//         value={this.state.value}
//       />
//     );
//   }
// }

const TextArea = ({caption, updateText}) => {
  let {text, readOnly} = caption;
  return (
    <textarea
      readOnly={readOnly}
      onChange={updateText}
      value={text}
    />
  );
};

export default TextArea;
