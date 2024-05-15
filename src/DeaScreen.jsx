import React, { useEffect, useState } from 'react'

import { Button } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Text } from '@mantine/core';
import { Alert } from '@mantine/core';
import { Select } from '@mantine/core';
import { FileInput } from '@mantine/core';

export default function DeaScreen() {
    const [alphabet, setAlphabet] = useState(["ε"]); //String array
    const [alphabetInput, setAlphabetInput] = useState(""); //String

    const [states, setStates] = useState([]); //State array
    const [statesInput, setStatesInput] = useState(""); //String
    const [startState, setStartState] = useState(""); //String
    const [endStates, setEndStates] = useState([]); //String

    const [word, setWord] = useState(""); //String
    function updateWord(word){
        setWord(word);
        if(word === "") {
            setIsWordInLanguage(null);
            return;
        }
        checkWord(word);
    }
    const [isWordInLanguage, setIsWordInLanguage] = useState(null); //String

    const [transitions, setTransitions] = useState({});

    const [isInTransitionsInput, setIsInTransitionsInput] = useState(false);
    const [transitionsStartStateInput, setTransitionsStartStateInput] = useState(null);
    const [transitionsActionSymbolInput, setTransitionsActionSymbolInput] = useState(null);
    const [transitionsEndStateInput, setTransitionsEndStateInput] = useState(null);

    function exportSettingsToJson() {
        const settings = {
            alphabet: alphabet,
            states: states,
            startState: startState,
            transitions: transitions
        };
    
        const jsonSettings = JSON.stringify(settings, null, 2)
    
        const blob = new Blob([jsonSettings], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
    
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'settings.json'; //Filename
    
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    
        URL.revokeObjectURL(url);
    }

    function addAlphabet(symbol) {
        if(symbol === "") return;
        if(alphabet.includes(symbol)) return;

        setAlphabet([...alphabet, symbol]);
        setAlphabetInput("");
    }
    
    function addStates(stateName) {
        stateName = stateName.trim();
        if(stateName === "") return;
        if(states.includes(stateName)) return;

        setStates([...states, stateName]);
        setStatesInput("");

        if(startState === "") setStartState(stateName);
    }

    function clearAlphabet() {
        setAlphabet(["ε"]);
        clearTransitions();
    }

    function clearStates() {
        setStates([]);
        clearStartState();
        clearTransitions();
    }

    function clearTransitions() {
        setTransitions({});
        clearEndStates();
    }

    function clearStartState() {
        setStartState("");
    }

    function clearEndStates() {
        setEndStates([]);
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

        if(actionSymbol === "ε") endState = "ε";

        if(actionSymbol === "ε"){
            endStates.push(startState);
        };
    
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

    function checkWord(word){
        let currentState = startState
        let isValid = true
    
        // Durch jedes Symbol im Wort iterieren
        for (let i = 0; i < word.length; i++) {
            const symbol = word[i]
    
            // Prüfen, ob es einen Übergang für das aktuelle Symbol im aktuellen Zustand gibt
            if (transitions[currentState] && transitions[currentState][symbol]) {
                currentState = transitions[currentState][symbol]
            } else {
                isValid = false
                break
            }
        }
    
        // Endzustand erreicht?
        if (!endStates.includes(currentState)) {
            isValid = false
        }
    
        // Ausgabe
        if (isValid) {
            setIsWordInLanguage(true)
            console.log("Das Wort wird akzeptiert.")
        } else {
            setIsWordInLanguage(false)
            console.log("Das Wort wird nicht akzeptiert.")
        }
    }

    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100vh", width:"100vw", gap:"50px"}}>

            <Alert variant="light" color="red" title="Betaphase">
                Diese Seite befindet sich in der Entwicklungsphase.
            </Alert>

            <div style={{display:"flex", flexDirection:"column", gap:"5px", justifyContent:"center", alignItems:"start"}}>
                <TextInput size="xs" label="Word" description="" placeholder="abbca" value={word} onChange={(event) => updateWord(event.currentTarget.value)}/>
                {/* <Button size="xs" variant="filled" color="cyan" onClick={()=>checkWord(word)}>Check</Button> */}
                {isWordInLanguage != null && <span style={{fontSize:"12px", color:isWordInLanguage ? "green" : "red"}}>{isWordInLanguage ? "Akzeptiert" : "Nicht akzeptiert"}</span>}
            </div>

            <div style={{display:"flex", flexDirection:"column", width:"auto", height:"auto", justifyContent:"center", alignItems:"start", backgroundColor:"", gap:"5px", maxWidth:"500px"}}>
                <Text size="md">G = (V, &Sigma;, P, S)</Text>

                <div style={{display:"flex", flexDirection:"row", justifyContent:"start", alignItems:"center", gap:"20px"}}>
                    <Text size="md">S = </Text>
                    <div style={{width:"70px"}}><Select size="xs" placeholder="S ∈ V" data={states} value={startState} onChange={setStartState}/></div>
                </div>

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
                            {`${startState} ➝ ${actionSymbol} ${(endState == null || endState === "ε") ? "" :  endState}`}
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

            <div style={{display:"flex", fleXDirection:"row", width:"auto", height:"auto", gap: "5px", justifyContent:"center", alignItems:"center"}}>
                <Button size="xs" variant="filled" color="grey" onClick={()=>exportSettingsToJson()}>Export settings</Button>
                <FileInput clearable accept=".json" size="xs" label="" description="" placeholder="Import settings"/>
            </div>
        </div>
    )
}
