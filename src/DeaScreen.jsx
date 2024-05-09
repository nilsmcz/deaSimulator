import React, { useEffect, useState } from 'react'

import { Button } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Text } from '@mantine/core';
import { Alert } from '@mantine/core';

import State from './stateMachine/State';

export default function DeaScreen() {
    const [alphabet, setAlphabet] = useState([]); //String array
    const [alphabetInput, setAlphabetInput] = useState(""); //String

    const [states, setStates] = useState([]); //State array
    const [statesInput, setStatesInput] = useState(""); //String

    function addAlphabet(symbol) {
        if(symbol === "") return;
        if(alphabet.includes(symbol)) return;

        setAlphabet([...alphabet, symbol]);
        setAlphabetInput("");
    }
    
    function addStates(stateName) {
        stateName = stateName.trim();
        if(stateName == "") return;
        if (states.some(state => state.name === stateName)) return;

        let newState = new State(stateName);
        if(states.includes(newState)) return;

        setStates([...states, newState]);
        setStatesInput("");
    }

    function clearAlphabet() {
        setAlphabet([]);
    }

    function clearStates() {
        setStates([]);
    }

    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100vh", width:"100vw", gap:"50px"}}>

            <Alert variant="light" color="red" title="Betaphase">
                Diese Seite befindet sich in der Entwicklungsphase.
            </Alert>

            <div style={{display:"flex", flexDirection:"column", width:"auto", height:"auto", justifyContent:"center", alignItems:"start", backgroundColor:"", gap:"5px", maxWidth:"500px"}}>
                <Text size="md">G = (V, &Sigma;, P, S)</Text>

                <div style={{display:"flex", flexDirection:"row", justifyContent:"start", alignItems:"center", gap:"20px"}}>
                    <Text size="md">V = {`{${states.map(state => state.name).join(', ')}}`}</Text>
                    <div style={{display:"flex", flexDirection:"row", gap:"5px"}}>
                        <div style={{width:"60px"}}><TextInput size="xs" variant="filled" placeholder='"q1"' value={statesInput} onChange={(event) => setStatesInput(event.currentTarget.value)}/></div>
                        <Button size="xs" variant="filled" color="cyan" onClick={()=>addStates(statesInput)}>Add</Button>
                        <Button size="xs" variant="filled" color="red" onClick={()=>clearStates()}>Clear</Button>
                    </div>
                </div>

                <div style={{display:"flex", flexDirection:"row", justifyContent:"start", alignItems:"center", gap:"20px"}}>
                    <Text size="md">&Sigma; = {`{${alphabet.join(', ')}}`}</Text>
                    <div style={{display:"flex", flexDirection:"row", gap:"5px"}}>
                        <div style={{width:"60px"}}><TextInput size="xs" variant="filled" placeholder='"a"' value={alphabetInput} onChange={(event) => setAlphabetInput(event.currentTarget.value)}/></div>
                        <Button size="xs" variant="filled" color="cyan" onClick={()=>addAlphabet(alphabetInput)}>Add</Button>
                        <Button size="xs" variant="filled" color="red" onClick={()=>clearAlphabet()}>Clear</Button>
                    </div>
                </div>

                <Text size="md">P: </Text>
            </div>
        </div>
    )
}
