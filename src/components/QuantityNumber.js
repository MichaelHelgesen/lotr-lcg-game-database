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
        // If  higher number
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
        // If lower number and not zero
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
        // If zero (delete)
        if (number === 0) {
            const action = unset(
                [{ _ref: cardId }]
            );
            onChange(PatchEvent.from(action));
        }
    }
    const numberElement = (color, number) => {
        return (
            <Button onClick={(event) => {handleClick(number)}} radius={0} shadow={1} padding={1} tone={color || "default"} mode={color == "default" && "ghost"} key={number}>{number || "0"}</Button>
        )
    }

    return (
        <Flex>
            {deckLimit.map(number => {
                if (number != 0 && number === value) {
                    return (
                        numberElement("positive", number)
                    )
                } else if (number === 0 && value === 0) {
                    return (
                        <Box style={{ background: "#f5f5f5" }} radius={0} shadow={1} padding={1} key={0}>{number}</Box>
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