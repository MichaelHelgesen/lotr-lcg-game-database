import React, { useState } from 'react'
import CardListComponentQuantity from './CardListComponentQuantity';
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

export const CardListComponent = React.forwardRef((props, ref) => {
    const { card, value, onChange } = props
    return (
        <Flex>
            <Box flex="1">
                <Text>{card.name}</Text>
            </Box>
            <CardListComponentQuantity deckLimit={card.deckLimit} value={value.length} cardId={card._id} onChange={onChange}/>
        </Flex>
    )
})

export default CardListComponent