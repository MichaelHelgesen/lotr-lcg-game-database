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

export const CardList = React.forwardRef((props, ref) => {
    const { cardList, value, onChange, filterList } = props
    const references = value.map(reference => reference._ref)
    /* let filterArray = []
    console.log("FILTERARRAY", filterArray)
    for (const key in filterList) {
        filterArray = [...filterList[key]]
    } */

    cardList

    return (
        <Box>
            {cardList.map(card => {
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
        </Box>
    )
})

export default CardList