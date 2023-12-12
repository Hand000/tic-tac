import React from 'react';
import './static/style/main.css';

export default class Square extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.state = {
      content: this.props.content
    }
  }
  
  render() {    
    return (
      <div className="square" onClick={this.onClick}>
        {this.props.content}
      </div>
    );
  }

  onClick() {
    if (this.props.content === "") {
      this.props.onClick(this.props.pos[0], this.props.pos[1]);
    }
  }
}