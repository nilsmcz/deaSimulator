export default class StateMachine {

  name = "" //String
  states = [] //List vom Typ State
  alphabet = [] //List vom Typ String
  initialState = null //State
  currentState = null //State

  constructor(name = "My DEA", states = [], alphabet = ["a", "b"]) {
    this.name = name
    this.states = states
    this.currentState = states[0]
    this.alphabet = alphabet
  }

  addState(state) {
    this.states.push(state)
  }
  
  removeState(state) {
    this.states = this.states.filter(s => s != state)
  }

  addAlphabet(symbol) {
    if (!this.alphabet.includes(symbol)) {
      this.alphabet.push(symbol)
    }
  }

  removeAlphabet(symbol){
    this.alphabet = this.alphabet.filter(s => s != symbol)
  }

  setName(name){
    this.name = name
  }

  setInitialState(state){
    this.initialState = state
  }
}