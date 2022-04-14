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
    Checkbox
} from "@sanity/ui";

export const DeckList = React.forwardRef((props, ref) => {
    const { cardList, value, onChange } = props
    const references = value.map(reference => reference._ref)
    const filteredCardList = cardList.filter(card => references.indexOf(card._id) != -1)

    return (
        <Stack>
            {filteredCardList.map(card => {
                return (
                    <CardListComponent
                        key={card._id}
                        card={card}
                        onChange={onChange}
                        value={
                            references.filter(reference => reference === card._id)
                        }
                    />
                )
            })}
        </Stack>
    )
})

export default DeckList