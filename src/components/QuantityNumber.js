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
    const { deckLimit, value, cardId, onChange } = props
    const handleClick = (number) => {
        if (number > value) {
            let i = value
            do {
                i++
                const action = insert(
                    [{ _ref: cardId, _type: "reference", _key: `${cardId}-${i}` }],
                    "after",
                    [-1]
                );
                onChange(PatchEvent.from(action).prepend(setIfMissing([])));
            } while (i < number);
            
        }
        if (number < value && number != 0) {
            let i = value
            do {
                i--
                const action = unset(
                    [{ _key: `${cardId}-${i + 1}` }]
                );
                onChange(PatchEvent.from(action));
            } while (i > number);

        }
        if (number === 0) {
            const action = unset(
                [{ _ref: cardId }]
            );
            onChange(PatchEvent.from(action));
        }
    }
    const numberElement = (color, number) => {
        return (
            <Text onClick={(event) => { handleClick(number) }} key={number} style={{ background: `${color}` }}>{number}</Text>
        )
    }

    return (
        <Flex>
            {deckLimit.map(number => {
                if (number != 0 && number === value) {
                    return (
                        numberElement("green", number)
                    )
                } else if (number === 0 && value === 0) {
                    return (
                        numberElement("gray", number)
                    )
                } else {
                    return (
                        numberElement("none", number)
                    )
                }

            })
            }
        </Flex>
    )
})

export default QuantityNumber