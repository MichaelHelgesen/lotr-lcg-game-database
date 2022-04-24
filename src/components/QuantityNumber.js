import React, { useState } from 'react'
import { nanoid } from 'nanoid';
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
import PatchEvent, {
    set,
    unset,
    prepend,
    insert,
    setIfMissing,
} from "@sanity/form-builder/PatchEvent";


export const QuantityNumber = React.forwardRef((props, ref) => {
    const { deckLimit, cardList, deckList, card, setDeckList, value, cardId, onChange, size, onClose } = props

    const currentCardInDeck = value.length ? value.filter(refObj => refObj.card._ref == cardId) : []

    
    

    const handleClick = (number) => {
        // If  higher number
        if (number != 0) {
            console.log("number not 0")
            if (deckList.indexOf(card) != -1) {
                console.log("allerede i liste")
                
                const action = insert(
                    [{
                        _key: cardId,
                        card: { _ref: cardId, _type: "reference" },
                        quantity: number
                    }],
                "replace",
                [value.map(ref => ref._key).indexOf(cardId)]

                );
                onChange(PatchEvent.from(action));
                //setDeckList(prevState => prevState.filter(obj => obj != card))
            } else {
                console.log("ikke i liste")
                const action = insert(
                    [{
                        _key: cardId,
                        card: { _ref: cardId, _type: "reference" },
                        quantity: number
                    }],
                    "after",
                    [-1]
                );
                onChange(PatchEvent.from(action).prepend(setIfMissing([])));
                setDeckList(prevState => [...prevState, card])
            }

        }
        onClose ? onClose() : null
        // If lower number and not zero
        /* if (number < value && number != 0) {
            let i = value
            do {
                i--
                const action = unset(
                    [{ _key: `${cardId}-${i + 1}` }]
                );
                onChange(PatchEvent.from(action));
            } while (i > number);
            onClose ? onClose() : null
        } */
        // If zero (delete)
        if (number === 0) {
            console.log("number is 0")
            const action = unset(
                [{ _key: cardId }]
            );
            onChange(PatchEvent.from(action));
            setDeckList(prevState => prevState.filter(obj => obj != card))
        }
    }

    const numberElement = (color, number) => {
        return (
            <Button onClick={(event) => { handleClick(number) }} radius={0} shadow={1} padding={1} tone={color || "default"} mode={color == "default" && "ghost"} key={number}><Text size={size}>{number || "0"}</Text></Button>
        )
    }

    return (
        <Flex>
            {deckLimit.map(number => {
                if (number != 0 && currentCardInDeck.length && number === currentCardInDeck[0].quantity) {
                    return (
                        <Button radius={0} shadow={1} padding={1} tone={"positive"} mode={"default"} key={number}><Text size={size}>{number || "0"}</Text></Button>
                        )
                } else if (number === 0 && !currentCardInDeck.length) {
                    return (
                        <Box style={{ background: "#f5f5f5" }} radius={0} shadow={1} padding={1} key={0}><Text size={size}>{number}</Text></Box>
                    )
                } else {
                    return (
                        numberElement("default", number)
                    )
                }
            })
            }
        </Flex>
    )
})

export default QuantityNumber