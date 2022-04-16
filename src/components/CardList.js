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
    const { cardList, value, onChange, filterList, sortFunction } = props

    console.log(filterList)
    const references = value.map(reference => reference._ref)

    let newArr = [...cardList]

    for (const key in filterList) {
        if (filterList[key].length) {
            newArr = newArr.filter(card => filterList[key].indexOf(card[key]._ref) != -1
            )
        }
    }

    return (
        <Box>
            {newArr.map(card => {
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