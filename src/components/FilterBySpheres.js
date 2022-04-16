// /src/MyCustomString.js

import React, { useState } from 'react'
import {
    TextInput,
    Stack,
    Label,
    Grid,
    Card,
    Text,
    Button,
    Flex,
    Box,
} from "@sanity/ui";




export const FilterBySpheres = React.forwardRef((props, ref) => {
    const { spheres, setFilterList } = props
    
    const [status, setStatus] = useState([])

    const handleClick = (event, name) => {
        // Se om denne kan gjøres annerledes? Føles dobbelt opp.
        setStatus(prevState => {return prevState.indexOf(name) != -1 ? prevState.filter(type => type != name) : [...prevState, name]})
        
        setFilterList(prevState => {
                return (
                    {
                        ...prevState,
                        sphere: prevState.sphere.indexOf(name.toLowerCase()) != -1 ? prevState.sphere.filter(type => type != name.toLowerCase()) : [...prevState.sphere, name.toLowerCase()]
                    }
                )
            }
        )
    }

    return (
        <Flex>
            {spheres.map(sphere => {
                return (
                    <Card flex="1" padding={1} shadow={1} key={sphere.name} tone={`${status.indexOf(sphere.name) != -1 ? "positive" : ""}`}>
                        <Text onClick={(event) => {handleClick(event, sphere.name)}} size={1} align="center">{sphere.name.slice(0, 3)}</Text>
                    </Card>
                )
            })}
        </Flex>
    )
})

export default FilterBySpheres