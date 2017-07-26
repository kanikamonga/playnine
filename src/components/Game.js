import React from 'react';
import Stars from './Stars'
import Answer from './Answer'
import Button from './Button'
import DoneFrame from './DoneFrame'
import Numbers, { Numberlist } from './Number'
import _ from 'lodash'
import possibleCombinationSum from './../utils/IsPossibleCombinationSum'

class Game extends React.Component{

static randomNumber = () => 1  + Math.floor(Math.random()*9)

state={
  selectedNumbers:[],
  usedNumbers:[],
  randomNumberOfStars:Game.randomNumber(),
  answerIsCorrect:null,
  redraws:5,
  doneStatus :null
  };

  selectNumber = (clickedNumber) => {
  if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0){return;};
  if(this.state.usedNumbers.indexOf(clickedNumber) >= 0){return;};
		this.setState(prevState => ({
    answerIsCorrect :null,
		selectedNumbers:prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  unSelectNumber = (clickedNumber) => {
		this.setState(prevState => ({
	  answerIsCorrect :null,
    selectedNumbers:prevState.selectedNumbers.filter(number => 					     		  number!=clickedNumber)
    }))};

  checkAnswer = () => {
  	this.setState(prevState => ({
    answerIsCorrect:prevState.randomNumberOfStars ===
    prevState.selectedNumbers.reduce((acc,n) => acc + n,0)
    }));
  };

  acceptAnswer = () =>{
  	this.setState(prevState => ( {
    	usedNumbers:prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers:[],
      answerIsCorrect:null,
		  randomNumberOfStars:Game.randomNumber(),
    }),this.updateDoneStatus);
  }

  redraw = () =>{
  if(this.state.redraws===0){return;}
  this.setState(prevState => ({
	selectedNumbers:[],
  randomNumberOfStars:Game.randomNumber(),
  answerIsCorrect:null,
	redraws:prevState.redraws-1
  }),this.updateDoneStatus);
  }

  possibleSolutions = ({randomNumberOfStars,usedNumbers}) =>{
  	const possibleNumbers = _.range(1,10).filter(
    number =>usedNumbers.indexOf(number) === -1);
  		console.log(possibleNumbers, randomNumberOfStars)
      return possibleCombinationSum(possibleNumbers,randomNumberOfStars)

  }

  updateDoneStatus = ()=>{
  	this.setState(prevState =>{
    	if(prevState.usedNumbers.length===9){
      	return {doneStatus:'Done  Nice!  '}
        }
        if(prevState.redraws===0 && !this.possibleSolutions(prevState)){
        	return {doneStatus :'Game Over !'}
        }
      }
    );
  }

  render(){
  const {selectedNumbers,randomNumberOfStars,answerIsCorrect,usedNumbers,redraws,doneStatus } = this.state;
		return(
			<div className="container">
        <h3>Play Nine</h3>
        <br />
  	    <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button selectedNumbers = {selectedNumbers}
            checkAnswer = {this.checkAnswer}
            answerIsCorrect = {answerIsCorrect}
            acceptAnswer = {this.acceptAnswer}
            redraw = {this.redraw}
            redraws = {redraws}
          />
          <Answer selectedNumbers={selectedNumbers}
          unSelectNumber = {this.unSelectNumber}
          />
        </div>
        <br />
        {doneStatus ?  <DoneFrame doneStatus = {doneStatus} />:
       <Numbers selectedNumbers={selectedNumbers}
        usedNumbers = {usedNumbers}
        selectNumber = {this.selectNumber}
        />
				}
       </div>
  	);
  }
}

export default Game;
