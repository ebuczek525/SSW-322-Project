import React from 'react';

import { Input, Radio, Button} from "antd";

import "../styling/question.less"


class MultipleChoice extends React.Component {  
    constructor(props) {
        super(props);
    
        this.state = {
            type: 'mc',
            question: '',
            correctAnswer: '',
            answers: {},
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
        e.persist();
        console.log(e);
        this.setState((state) => {
          state.answers[e.target.id] = e.target.value;
          return {answers: state.answers};
        }, () => {this.props.callback(this.state)});
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
        const answers = this.state.answers;

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
                    <Radio style={radioStyle} value={answers['answer1']}>
                       1. <Input value={answers['answer1']} id='answer1' placeholder="Option 1..." onChange={(e) => this.handleAnswerChange(e)}/>
                    </Radio>
                    <Radio style={radioStyle} value={answers['answer2']}>
                       2. <Input value={answers['answer2']} id='answer2' placeholder="Option 2..." onChange={(e) => this.handleAnswerChange(e)}/> 
                    </Radio>
                    <Radio style={radioStyle} value={answers['answer3']}>
                       3. <Input value={answers['answer3']} id='answer3' placeholder="Option 3..." onChange={(e) => this.handleAnswerChange(e)}/>
                    </Radio>
                    <Radio style={radioStyle} value={answers['answer4']}>
                       4. <Input value={answers['answer4']} id='answer4' placeholder="Option 4..." onChange={(e) => this.handleAnswerChange(e)}/>
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