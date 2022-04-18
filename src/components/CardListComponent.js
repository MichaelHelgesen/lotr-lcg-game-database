import React, { useState } from 'react'
import CardListComponentQuantity from './CardListComponentQuantity';
import CardDialog from './CardDialog';
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
    const [open, setOpen] = useState(false)

    const onClose = React.useCallback(
        () => {
            setOpen(false)
        }, []
    );

    const onOpen = React.useCallback(
        () => {
            setOpen(true)
        }, []
    );
    return (
        <Card shadow={1} padding={2}>
            <Flex align="center">
                <Box flex="1">
                    <Text onClick={onOpen} size={size}>{card.name}</Text>
                </Box>
                <CardListComponentQuantity size={size} deckLimit={card.deckLimit} value={value.length} cardId={card._id} onChange={onChange} />
            </Flex>
            <CardDialog card={card} onClose={onClose} open={open} size={size} value={value.length} onChange={onChange} setOpen={setOpen}/>
        </Card>
    )
})

export default CardListComponent