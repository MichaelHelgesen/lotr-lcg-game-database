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
    const idList = [...value.map(ref => ref._ref)];
    //const filteredCardList = [...cardList.filter(card => references.indexOf(card._id) != -1)]
    const typeList = [...new Set(deckList.map(card => card.cardType._ref))]
    const newArr = [...deckList].map(card => {
        return {
            ...card,
            quantity: value.filter(ref => ref._ref == card._id).length
        }
    })

    return (
        <Stack>
            {typeList.map(type => {
                
                return (<div>
                    <Text>{type} ({
                    newArr.filter(card => card.cardType._ref == type)
                    .map(card => card.quantity)
                    .reduce((
                        previousValue, currentValue) => previousValue + currentValue,
                    0
                  )
                }):</Text>
                    {deckList.filter(card => card.cardType._ref == type).map(card => {
                        return (<div>
                            <CardListDeckComponent
                                key={card._id}
                                card={card}
                                onChange={onChange}
                                value={
                                    references.filter(reference => reference === card._id)
                                }
                            />
                        </div>)
                    })
                    }
                </div>)
            }
            )}
        </Stack>
    )
})

export default DeckList