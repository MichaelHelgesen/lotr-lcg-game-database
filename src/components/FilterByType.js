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

export const FilterByType = React.forwardRef((props, ref) => {
    const { types, setFilterList } = props

    const [status, setStatus] = useState([])

    const handleClick = (name) => {
        // Se om denne kan gjøres annerledes? Føles dobbelt opp.
        setStatus(prevState => {
            return prevState.indexOf(name) != -1 ? prevState.filter(type => type != name) : [...prevState, name]
        })
        setFilterList(prevState => {
            return (
                {
                    ...prevState,
                    cardType: prevState.cardType.indexOf(name.toLowerCase()) != -1 ? prevState.cardType.filter(type => type != name.toLowerCase()) : [...prevState.cardType, name.toLowerCase()]
                }
            )
        }
    )
    }
    return (
        <Flex wrap="wrap">
            {types.map(type => {
                return (
                    <Card flex="1" padding={2} shadow={1} key={type.name} tone={`${status.indexOf(type.name) != -1 ? "positive" : ""}`}>
                        <Text onClick={(event) => { handleClick(type.name) }} size={1} align="center">{type.name.slice(0, 3)}</Text>
                    </Card>
                )
            })}
        </Flex>
    )
})

export default FilterByType