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

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


export const FilterBySpheres = React.forwardRef((props, ref) => {

    const { sorting } = props

    const spheres = Object.keys(sorting)

    function handleChange(val) {
        props.onClick(val);
    }
    //console.log("Filterbuttons running")

    return (
        <Flex wrap="wrap">
            {spheres.map(sphere => {
                let newName = sphere.slice(0, 1).toUpperCase() + sphere.slice(1, 3);
                return (
                    sorting[sphere]
                        ?
                        <Card key={sphere} tone="positive" flex="1" radius={0} shadow={1} padding={2} onClick={(event) => { handleChange(sphere) }}>
                            <Text align="center" size="1">{newName}</Text>
                        </Card>
                        :
                        <Card key={sphere} flex="1" radius={0} shadow={1} padding={2} onClick={(event) => { handleChange(sphere) }}>
                            <Text align="center" size="1">{newName}</Text>
                        </Card>
                )
            })}
        </Flex>
    )
})

export default FilterBySpheres