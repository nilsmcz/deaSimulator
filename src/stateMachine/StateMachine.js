export default class StateMachine {

  states = []
  currentState

  constructor(states) {
    this.states = states
    this.currentState = states[0]
  }

    transition(action) {
      let transition = null
      for (const t of this.currentState.transitions) {
        if (t.action === action) {
          transition = t
          break
        }
      }
      if (transition) {
        this.currentState = transition.to
      } else {
        console.log('Invalid action')
      }
  }

  printCurrentState() {
    console.log(this.currentState.name)
  }

  addState(state) {
    this.states.push(state)
  }
}