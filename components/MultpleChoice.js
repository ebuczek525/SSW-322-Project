import React from 'react';

import { Input, Radio } from "antd";
import Layout from "../components/MyLayout";



class MultipleChoice extends React.Component {  
    constructor(props) {
        super(props);
    
        // Set initial tab state
        this.state = {
            question: '',
            correctAnswer: '',
            answers: {},
            value: 1,
        };
      }

      handleQuestionChange(e) {
        this.setState({[e.target.id]: e.target.value}, () => {this.props.callback(this.state)});
        console.log('changed:', e );
      }

      handleAnswerChange(e) {
        e.persist();
        console.log(e);
        this.setState((state) => ({answers: state.answers[e.target.id] = e.target.value}));
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
                <div>     
                    Question:
                    <Input value={question} id='question' placeholder="Enter Question..." onChange={(e) => this.handleQuestionChange(e)}/>
                </div>
                <div>
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                    <Radio style={radioStyle} value={1}>
                       1. <Input value={answers['answer1']} id='answer1' placeholder="Option 1..." onChange={(e) => this.handleAnswerChange(e)}/>
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                       2. <Input value={answers['answer2']} id='answer2' placeholder="Option 2..." onChange={(e) => this.handleAnswerChange(e)}/> 
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                       3. <Input value={answers['answer3']} id='answer3' placeholder="Option 3..." onChange={(e) => this.handleAnswerChange(e)}/>
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                       4. <Input value={answers['answer4']} id='answer4' placeholder="Option 4..." onChange={(e) => this.handleAnswerChange(e)}/>
                    </Radio>
                </Radio.Group>
                </div>
            </>   
        );
    }
}

export default MultipleChoice;