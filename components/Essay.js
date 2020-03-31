import React from 'react';

import { Input, Radio, Button} from "antd";

import "../styling/question.less"

const { TextArea } = Input;


class Essay extends React.Component {  
    constructor(props) {
        super(props);
    
        this.state = {
            type: 'es',
            question: '',
            value: '',
            index: this.props.index,
        };

        this.props.callback(this.state);
      }

      handleQuestionChange(e) {
        this.setState({[e.target.id]: e.target.value}, () => {this.props.callback(this.state)});
        console.log('changed:', e );
      }

      handleAnswerChange(e) {
        this.setState({[e.target.id]: e.target.value}, () => {this.props.callback(this.state)});
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
        const value = this.state.value;
        return (
            <>
              <div className="essay">
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
                  <TextArea rows={10} value={value} id='value' placeholder="Option 1..." onChange={(e) => this.handleAnswerChange(e)}/>
                </div>
              </div>
              <hr style={{ width: "97%", marginTop: "3vh", marginBottom: "3vh" }} />
            </>   
        );
    }
}

export default Essay;