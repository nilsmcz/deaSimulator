import React, { useEffect, useState } from 'react'
import { Button } from '@mantine/core';

//StateMachine
import StateMachine from './stateMachine/StateMachine';
import State from './stateMachine/State';
import Transition from './stateMachine/Transition';

export default function DeaScreen() {

    const [dea, setDea] = useState(null)

    useEffect(() => {
        const dea = new StateMachine([])
        setDea(dea)
    }, [])

    function addState(){
        const stateCount = dea?.states?.length ?? 0
        dea.addState(new State("S" + stateCount))
        console.log(dea.states)
    }

    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100vh", width:"100vw"}}>
            <Button variant="filled" color="rgba(15, 23, 42, 1)" onClick={()=>addState()}>State hinzufügen</Button>
        </div>
    )
}
