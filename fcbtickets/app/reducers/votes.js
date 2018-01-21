import {images} from "../assets/index";
import moment from 'moment';
import _ from 'lodash';

/**
 * Configuration reducer
 * @flow
 */
'use strict';
export const type = {
  addProposal: 'addProposal',
  addVote: 'addVote',
  setVoteInProgress: 'setVoteInProgress',
};

// struct Proposal {
//   address uid;             // unique id of a proposal
//   string name;            // short name
//   uint voteCount;         // number of accumulated votes
//   string description;     // description of the proposal
//   address creator;        // account of the person who created the proposal
//   string createdOn;       // date of creation
// }

let initialState = {
  proposals: [{
    key: 1,
    uid: '1',
    name: 'app',
    mode: 'simple',
    banner: images.bayernBanner,
    title: 'Test1',
    text: 'Would you like to use this app?',
    options: [{text: 'Yes'},{text: 'No'}]
  },{
    key: 2,
    uid: '2',
    name: 'jerseys2018',
    voteCount: 0,
    title: 'Home Jersey 2018/2019',
    text: 'Which jersey would you prefer next season?',
    creator: 'FCBayern',
    mode: 'image',
    options: [{image: images.bayernJersey1},{image: images.bayernJersey2}]
  },{
    key: 3,
    uid: '3',
    name: 'test',
    mode: 'simple',
    banner: images.bayernTeam,
    title: 'Test3',
    text: 'Would you like to drink coffee?',
    options: [{text: 'Yes'},{text: 'No'}]
  }],
  votes: [],
  votesInProgress: [],
};


export function reducer(state : State = initialState, action : Action) : State {
  let vote = null;
  let votesInProgress = null;
  switch(action.type){
    case type.addVote:
      vote = action.value;
      let votes = _.cloneDeep(state.votes);
      votes.push(vote);
      return { ...state, votes};
    case type.setVoteInProgress:
      const {inProgress, proposalId} = action.value;
      votesInProgress = _.cloneDeep(state.votesInProgress);
      if (inProgress) {
        votesInProgress.push(proposalId);
      } else {
        const index = votesInProgress.findIndex((el, index) => el === proposalId);
        if (index >= 0) {
          votesInProgress.splice(index, 1);
        }
      }
      return {...state, votesInProgress}
  }
  return state;
}