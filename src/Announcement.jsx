import React, { Component } from 'react';
import './Announcement.css';

export default class Announcement extends Component{
  render(){
    //if there's a winner make visible else hide it

    return (
      <div className={this.props.winner ? 'visible' : 'hidden'}>
        <h2>{this.props.winner}</h2>
      </div>
    )
   }

}
