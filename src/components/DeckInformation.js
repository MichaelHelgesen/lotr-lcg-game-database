import React, { useState } from 'react'
import CardListComponent from './CardListComponent';
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
    Dialog,
    Checkbox,
    Autocomplete,
    SearchIcon
} from "@sanity/ui";

export const DeckInformation = React.forwardRef((props, ref) => {
    const { deckList, value } = props

    //!!! Flytte dette til FilterCards?
    const calculatedThreat = deckList
        .filter(
            card => card.cardType._ref === "hero"
        )
        .map(
            card => card.threat
        )
        .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        )
    const packList = [...new Set(deckList.map(card => card.pack._ref))];
    const sphereList = [...new Set(deckList.map(card => card.sphere._ref))];
    //!!!   
    
    return (
        <Card padding={[0]}>
            <Stack space={3}>
                <Text>Number of cards:{value.length} </Text>
                <Text>Starting threat: {calculatedThreat} </Text>
                <Text>Packs: {packList.map(pack => <span key={pack}>{pack}</span>)}</Text>
                <Text>Spheres: {sphereList.map(sphere => <span key={sphere}>{sphere}</span>)}</Text>
            </Stack>
        </Card>
    )
})

export default DeckInformation