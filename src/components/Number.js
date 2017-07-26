import React from 'react'
import _ from 'lodash'

export const Numberlist = _.range(1, 10);

const Numbers = (props) => {

  const numberClassName = (number) => {
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used';
    }
  }
  return (
    <div className="card text-center">
      <div>
        {Numberlist.map((number, i) => <span key={i} className={numberClassName(number)} onClick ={() => {
          props.selectNumber(number)
        }}>{number}
        </span>)}
      </div>
    </div>
  );
};

export default Numbers
