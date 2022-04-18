import React, { useState } from 'react'
import QuantityNumber from './QuantityNumber';
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
    Checkbox
} from "@sanity/ui";

export const CardListComponentQuantity = React.forwardRef((props, ref) => {
    const { deckLimit, value, cardId, onChange, size, closeDialog} = props
    let countArray = []
    for (let i = 0; i < deckLimit + 1; i++) {
        countArray.push(i)
    }
    return (
        <Box flex="1" >
            <Flex justify="flex-start">
                <QuantityNumber size={size} deckLimit={countArray} value={value} cardId={cardId} onChange={onChange} onClose={closeDialog}/>
            </Flex>
        </Box>
    )
})

export default CardListComponentQuantity

