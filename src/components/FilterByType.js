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


export const FilterByType = React.forwardRef((props, ref) => {

    const { sorting } = props

    const types = Object.keys(sorting)

    function filterByType(val) {
        props.onClick(val);
    }
    //console.log("Filterbuttons running")

    return (
        <Flex wrap="wrap">
            {types.map(type => {
                let newName = type.slice(0, 1).toUpperCase() + type.slice(1, 3);
                return (
                    sorting[type]
                        ?
                        <Card key={type} tone="positive" flex="1" radius={0} shadow={1} padding={2} onClick={(event) => { filterByType(type) }}>
                            <Text align="center" size="1">{newName}</Text>
                        </Card>
                        :
                        <Card key={type} flex="1" radius={0} shadow={1} padding={2} onClick={(event) => { filterByType(type) }}>
                            <Text align="center" size="1">{newName}</Text>
                        </Card>
                )
            })}
        </Flex>
    )
})

export default FilterByType