import React, { useEffect, useState } from 'react'
import { Button } from '@mantine/core';
import { TextInput } from '@mantine/core';
//StateMachine
import StateMachine from './stateMachine/StateMachine';
import State from './stateMachine/State';
import Transition from './stateMachine/Transition';

export default function DeaScreen() {

    const [dea, setDea] = useState(new StateMachine("My DEA",[]))
    const [valueAddAlphabet, setValueAddAlphabet] = useState('');
    const [valueAddStates, setValueAddStates] = useState('');

    function copyDea(prevDea){
        const newDea = new StateMachine(prevDea.name, [...prevDea.states], [...prevDea.alphabet]) // Kopie des Zustands
        return newDea
    }

    function addState(name){
        setDea((prevDea) => {
            const newState = new State(name);
            const newDea = copyDea(prevDea)
            newDea.addState(newState)
            setValueAddStates("")
            return newDea;
        });
    }

    function addAlphabet(symbol){
        setDea((prevDea) => {
            const newDea = copyDea(prevDea)
            newDea.addAlphabet(symbol)
            setValueAddAlphabet("")
            return newDea
        });
    }

    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100vh", width:"100vw"}}>

            <div style={{display:"flex", flexDirection:"row"}}>
                &Sigma; = &#123;{dea.alphabet.join(', ')}&#125;
                <TextInput
                    size="xs"
                    value={valueAddAlphabet}
                    onChange={(event) => setValueAddAlphabet(event.currentTarget.value)}
                    placeholder="Symbol"
                />
                <Button size="xs" variant="filled" color="rgba(15, 23, 42, 1)" onClick={()=>addAlphabet(valueAddAlphabet)}>+</Button>
            </div>

            <div style={{display:"flex", flexDirection:"row"}}>
                V = &#123;{dea.states.map(state => state.name).join(', ')}&#125;
                <TextInput
                    size="xs"
                    value={valueAddStates}
                    onChange={(event) => setValueAddStates(event.currentTarget.value)}
                    placeholder="Symbol"
                />
                <Button size="xs" variant="filled" color="rgba(15, 23, 42, 1)" onClick={()=>addState(valueAddStates)}>+</Button>
            </div>
        </div>
    )
}
