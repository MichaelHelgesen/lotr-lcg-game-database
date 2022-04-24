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
    const { deckList, setDeckList, cardList, value, onChange, sortFunction, replaceSpecialCharacters } = props
    //console.log(deckList)
    
    //const references = value.map(reference => reference._ref)

    const typeList = [...new Set(deckList.map(card => card.cardType._ref))].sort((a, b) => {
        if (a === "hero") {
            return -1
        }
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    })
    const newArr = [...deckList].map(card => {
        return {
            ...card,
            quantity: value.filter(ref => ref._key == card._id).length
        }
    })

    return (
        <Stack space={3}>
            {typeList.map(type => {

                return (<Stack>
                    <Box marginBottom={3}>
                        <Text>{type} ({
                            newArr.filter(card => card.cardType._ref == type)
                                .map(card => card.quantity)
                                .reduce((
                                    previousValue, currentValue) => previousValue + currentValue,
                                    0
                                )
                        }):</Text>
                    </Box>
                    {deckList.filter(card => card.cardType._ref == type).sort(sortFunction).map(card => {
                        return (
                            <Box>
                                <CardListDeckComponent
                                    key={card._id}
                                    card={card}
                                    cardList={cardList}
                                    setDeckList={setDeckList}
                                    deckList={deckList}
                                    onChange={onChange}
                                    value={value}
                                />
                            </Box>
                        )
                    })
                    }
                </Stack>)
            }
            )}
        </Stack>
    )
})

export default DeckList