import React, { useEffect, useState } from 'react'

import { Button } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Text } from '@mantine/core';
import { Alert } from '@mantine/core';
import { Select } from '@mantine/core';

import State from './stateMachine/State';

export default function DeaScreen() {
    const [alphabet, setAlphabet] = useState(["ε"]); //String array
    const [alphabetInput, setAlphabetInput] = useState(""); //String

    const [states, setStates] = useState([]); //State array
    const [statesInput, setStatesInput] = useState(""); //String

    const [transitions, setTransitions] = useState({});

    const [isInTransitionsInput, setIsInTransitionsInput] = useState(false);
    const [transitionsStartStateInput, setTransitionsStartStateInput] = useState(null);
    const [transitionsActionSymbolInput, setTransitionsActionSymbolInput] = useState(null);
    const [transitionsEndStateInput, setTransitionsEndStateInput] = useState(null);

    function addAlphabet(symbol) {
        if(symbol === "") return;
        if(alphabet.includes(symbol)) return;

        setAlphabet([...alphabet, symbol]);
        setAlphabetInput("");
    }
    
    function addStates(stateName) {
        stateName = stateName.trim();
        if(stateName == "") return;
        if(states.includes(stateName)) return;

        setStates([...states, stateName]);
        setStatesInput("");
    }

    function clearAlphabet() {
        setAlphabet(["ε"]);
    }

    function clearStates() {
        setStates([]);
    }

    function clearTransitions() {
        setTransitions({});
    }

    function resetTransitionInput(){
        setTransitionsStartStateInput(null);
        setTransitionsActionSymbolInput(null);
        setTransitionsEndStateInput(null);
    }

    function cancelTransitionInput(){
        resetTransitionInput();
        setIsInTransitionsInput(false);
    }

    function submitTransitionInput(startState, actionSymbol, endState){
        if(startState == null || actionSymbol == null) return;
        if(actionSymbol !== "ε" && endState == null) return;
    
        if (!transitions[startState]) {
            setTransitions({
                ...transitions,
                [startState]: {
                    [actionSymbol]: endState
                }
            });
        } else {
            if (transitions[startState][actionSymbol]) {
                const override = window.confirm("There is already a transition for this symbol from this state. Do you want to override the transition?");
                if (!override) return;
            }
    
            setTransitions({
                ...transitions,
                [startState]: {
                    ...transitions[startState],
                    [actionSymbol]: endState
                }
            });
        }
        resetTransitionInput()
    }
    

    // Beispiel für Übergänge:
    // transitions = {
    //   'q1': {
    //     'a': 'q2',
    //     'b': 'q3',
    //   },
    //   'q2': {
    //     'a': 'q1',
    //     'b': 'q3',
    //   },
    //   ...
    // };

    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100vh", width:"100vw", gap:"50px"}}>

            <Alert variant="light" color="red" title="Betaphase">
                Diese Seite befindet sich in der Entwicklungsphase.
            </Alert>

            <div style={{display:"flex", flexDirection:"column", width:"auto", height:"auto", justifyContent:"center", alignItems:"start", backgroundColor:"", gap:"5px", maxWidth:"500px"}}>
                <Text size="md">G = (V, &Sigma;, P, S)</Text>

                <div style={{display:"flex", flexDirection:"row", justifyContent:"start", alignItems:"center", gap:"20px"}}>
                    <Text size="md">V = {`{${states.join(', ')}}`}</Text>
                    <div style={{display:"flex", flexDirection:"row", gap:"5px"}}>
                        <div style={{width:"50px"}}><TextInput size="xs" variant="filled" placeholder='"q1"' value={statesInput} onChange={(event) => setStatesInput(event.currentTarget.value)}/></div>
                        <Button size="xs" variant="filled" color="cyan" onClick={()=>addStates(statesInput)}>Add</Button>
                        <Button size="xs" variant="filled" color="red" onClick={()=>clearStates()}>Clear</Button>
                    </div>
                </div>

                <div style={{display:"flex", flexDirection:"row", justifyContent:"start", alignItems:"center", gap:"20px"}}>
                    <Text size="md">&Sigma; = {`{${alphabet.join(', ')}}`}</Text>
                    <div style={{display:"flex", flexDirection:"row", gap:"5px"}}>
                        <div style={{width:"50px"}}><TextInput size="xs" variant="filled" placeholder='"a"' value={alphabetInput} onChange={(event) => setAlphabetInput(event.currentTarget.value)}/></div>
                        <Button size="xs" variant="filled" color="cyan" onClick={()=>addAlphabet(alphabetInput)}>Add</Button>
                        <Button size="xs" variant="filled" color="red" onClick={()=>clearAlphabet()}>Clear</Button>
                    </div>
                </div>

                <Text size="md">P: </Text>

                {Object.entries(transitions).map(([startState, transition]) => (
                    Object.entries(transition).map(([actionSymbol, endState]) => (
                        <div key={`${startState}-${actionSymbol}-${endState}`}>
                            {`${startState} ➝ ${actionSymbol} ${endState === null ? "" :  endState}`}
                        </div>
                    ))
                ))}

                {isInTransitionsInput &&
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"start", alignItems:"center", gap:"10px"}}>
                        <div style={{width:"70px"}}><Select size="xs" placeholder="state" data={states} value={transitionsStartStateInput} onChange={setTransitionsStartStateInput}/></div>
                        ➝
                        <div style={{width:"80px"}}><Select size="xs" placeholder="symbol" data={alphabet} value={transitionsActionSymbolInput} onChange={setTransitionsActionSymbolInput}/></div>
                        {transitionsActionSymbolInput != "ε" &&
                            <div style={{width:"70px"}}><Select size="xs" placeholder="state" data={states} value={transitionsEndStateInput} onChange={setTransitionsEndStateInput}/></div>
                        }
                        <div style={{display:"flex", gap:"5px"}}>
                            <Button size="xs" variant="filled" color="cyan" onClick={()=>submitTransitionInput(transitionsStartStateInput, transitionsActionSymbolInput, transitionsEndStateInput)}>Submit</Button>
                            <Button size="xs" variant="filled" color="red" onClick={()=>resetTransitionInput()}>Reset</Button>
                            <Button size="xs" variant="filled" color="red" onClick={()=>cancelTransitionInput()}>Cancel</Button>
                        </div>
                    </div>
                }

                <div style={{display:"flex", flexDirection:"row", gap:"5px"}}>
                    <Button size="xs" disabled={isInTransitionsInput} variant="filled" color="cyan" onClick={()=>setIsInTransitionsInput(true)}>Add</Button>
                    <Button size="xs" variant="filled" color="red" onClick={()=>clearTransitions()}>Clear</Button>
                </div>

            </div>
        </div>
    )
}
