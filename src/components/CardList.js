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

    const references = value.map(reference => reference._ref)

    let filteredCardList = [...cardList]

    for (const key in filterList) {
        if (filterList[key].length) {
            filteredCardList = filteredCardList.filter(card => {
                let matchingCard = false
                if (card[key]._ref) {
                    if (filterList[key].indexOf(card[key]._ref) != -1) {
                        matchingCard = true
                    }
                } else {
                    if (card[key].filter(trait => filterList[key].indexOf(trait._ref) != -1).length) {
                        matchingCard = true
                    }
                }
                return matchingCard
            }
            )
        }
    }

    return (
        <Box>
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
        </Box>
    )
})

export default CardList