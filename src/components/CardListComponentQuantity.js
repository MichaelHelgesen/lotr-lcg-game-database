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
    const { deckLimit, value, cardId, onChange} = props
    let countArray = []
    for (let i = 0; i < deckLimit + 1; i++) {
        countArray.push(i)
    }
    return (
        <Box flex="1">
            <Flex>
                <QuantityNumber deckLimit={countArray} value={value} cardId={cardId} onChange={onChange} />
            </Flex>
        </Box>
    )
})

export default CardListComponentQuantity

//<QuantityNumber />