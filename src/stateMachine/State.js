import Transition from './Transition.js';

export default class State {

    name;
    terminating = false;
    transitions = [];
  
    constructor(name, terminating = false) {
      this.name = name;
      this.terminating = terminating;
    }
  
    addTransition(to, action) {
      this.transitions.push(new Transition(to, action));
    }
  
    removeTransition(to) {
      this.transitions = this.transitions.filter(t => t.to != to);
    }
}