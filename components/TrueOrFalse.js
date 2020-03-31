import React from 'react';

import { Input, Radio, Button} from "antd";

import "../styling/question.less"


class MultipleChoice extends React.Component {  
    constructor(props) {
        super(props);
    
        this.state = {
            type: 'tf',
            question: '',
            correctAnswer: true,
            answers: [true, false],
            value: '',
            index: this.props.index,
        };

        this.props.callback(this.state);
      }

      handleQuestionChange(e) {
        this.setState({[e.target.id]: e.target.value}, () => {this.props.callback(this.state)});
        console.log('changed:', e );
      }

      onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
          correctAnswer: e.target.value
        }, () => {this.props.callback(this.state)});
      };


    render() {
        const question = this.state.question;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
        return (
            <>
              <div className="multipleChoice">
                <div >
                  <div id="question" style={{display: 'inline-block'}}>      
                      Question:
                      <Input value={question} id='question' placeholder="Enter Question..." onChange={(e) => this.handleQuestionChange(e)}/>
                  </div>
                  <div style={{display: 'inline-block', marginLeft: '2vw', marginRight: '2vw' }}>
                  <Button shape="circle" icon="delete" onClick={() => {this.props.removeItself(this.state.index)}}/>
                  </div>
                </div>
                <div id="answers">
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                    <Radio style={radioStyle} value={true}>
                       1. True
                    </Radio>
                    <Radio style={radioStyle} value={false}>
                       2. False
                    </Radio>
                </Radio.Group>
                </div>
              </div>
              <hr style={{ width: "97%", marginTop: "3vh", marginBottom: "3vh" }} />
            </>   
        );
    }
}

export default MultipleChoice;