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
    const { card, value, onChange, size } = props
    return (
        <Card shadow={1} padding={2}>
            <Flex align="center">
                <Box flex="1">
                    <Text size={size}>{card.name}</Text>
                </Box>
                <CardListComponentQuantity size={size} deckLimit={card.deckLimit} value={value.length} cardId={card._id} onChange={onChange} />
            </Flex>
        </Card>
    )
})

export default CardListComponent