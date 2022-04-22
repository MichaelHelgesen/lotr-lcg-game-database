import React, { useState } from 'react'
import CardListDeckComponent from './CardListDeckComponent';
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
    const { deckList, value, onChange } = props
    const references = value.map(reference => reference._ref)
    //const filteredCardList = [...cardList.filter(card => references.indexOf(card._id) != -1)]

    return (
        <Stack>
            {deckList.map(card => {
                return (
                    <CardListDeckComponent
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