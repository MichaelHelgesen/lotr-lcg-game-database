import React, { useState, useEffect } from "react";
import { FormField } from "@sanity/base/components";
import { nanoid } from 'nanoid'
import PatchEvent, {
    set,
    unset,
    prepend,
    insert,
    setIfMissing,
} from "@sanity/form-builder/PatchEvent";
import styles from "../components/filterCards.css";

import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: `2022-01-10` });
const { dataset, projectId, useCdn } = client.clientConfig;

// Import UI components from Sanity UI
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
} from "@sanity/ui";

export const FilterCards = React.forwardRef((props, ref) => {

    const {
        type,
        value,
        markers,
        presence,
        compareValue,
        onFocus,
        onBlur,
        onChange,
    } = props;

    const queryCardType = '*[_type == "card"]';

    // Adding all cards from database on load and update quantity
    const [cardList, setCardList] = useState([]);

    // Adding and removing cards from deck
    const [deck, setDeck] = useState([]);

    const sortFunction = (a, b) => {
        let navnA = a.name.toUpperCase();
        let navnB = b.name.toUpperCase();
        if (navnA < navnB) {
            return -1;
        }
        if (navnA > navnB) {
            return 1;
        }

        // Hvis navn er like
        return 0;
    }

    useEffect(() => {
        client.fetch(queryCardType).then((cards) => {
            setCardList(
                cards.map(card => {
                    let numberOfExistingCards = 0
                    if (value) {
                        value.forEach(obj => {
                            if (obj._ref === card._id) {
                                numberOfExistingCards++
                            }
                        })
                    }
                    if (numberOfExistingCards) {
                        setDeck(prevState => {
                            return [...prevState, { ...card, selected: numberOfExistingCards }].sort(sortFunction)
                        })
                    }
                    return { ...card, selected: numberOfExistingCards }
                })
            )

        })
    }, []);



    useEffect(() => {
        setCardList(prevState => {
            return prevState.map(card => {
                let numberOfExistingCards = 0
                if (value) {
                    value.forEach(obj => {
                        if (obj._ref === card._id) {
                            numberOfExistingCards++
                        }
                    })
                }
                return { ...card, selected: numberOfExistingCards }
            })
        }
        )

    }, [value]);




    const handleClick = React.useCallback(
        (num, card, isvalue) => {
            // Increase quantity of current card
            if (num > card.selected && num > 0) {
                for (let i = card.selected; i < num; i++) {
                    const action = insert(
                        [{ _ref: card._id, _type: "reference", _key: nanoid() }],
                        "after",
                        [-1]
                    );
                    onChange(PatchEvent.from(action).prepend(setIfMissing([])));
                }
                setDeck(prevState => {
                    return [...prevState.filter(existingCard => existingCard._id != card._id), { ...card, selected: num }].sort(sortFunction)
                })
                // Decrease quantity of current card
            } else if (num < card.selected && num > 0) {
                const currentRefs = isvalue.filter(obj => obj._ref === card._id)

                for (let i = num; i < card.selected; i++) {
                    const action = unset(
                        [{ _key: currentRefs[i - 1]._key }]
                    );
                    onChange(PatchEvent.from(action).prepend(setIfMissing([])));
                }
                setDeck(prevState => {
                    return [...prevState.filter(existingCard => existingCard._id != card._id), { ...card, selected: num }].sort(sortFunction)
                })
                // Delete card
            } else if (num === 0 && card.selected) {
                const action = unset(
                    [{ _ref: card._id }]
                );
                onChange(PatchEvent.from(action).prepend(setIfMissing([])));
                setDeck((prevState) => {
                    return [...prevState.filter(existingCard => {
                        return (existingCard._id != card._id)
                    })].sort(function (a, b) {
                        let navnA = a.name.toUpperCase(); // Ignorere store og små bokstaver
                        let navnB = b.name.toUpperCase(); // Ignorere store og små bokstaver
                        if (navnA < navnB) {
                            return -1;
                        }
                        if (navnA > navnB) {
                            return 1;
                        }
                        // Hvis navn er like
                        return 0;
                    })
                });
            }
        }, [onChange]
    );

    // Delete all references and all cards in deck
    const clearReferences = React.useCallback(
        (event) => {
            setDeck([]);
            const inputValue = [];
            onChange(PatchEvent.from(set(inputValue)));
        },
        [onChange]
    );

    const createQuantity = (num, card, isvalue) => {
        let quantityArray = []
        for (let i = 0; i <= num; i++) {
            if (card.selected && card.selected === i) {
                quantityArray.push(
                    <Button radius={0} shadow={1} padding={1} tone="positive" key={i}>{i}</Button>
                )
            } else if (!card.selected && i === 0) {
                quantityArray.push(
                    <Box style={{ background: "#f5f5f5" }} radius={0} shadow={1} padding={1} key={0}>0</Box>
                )
            } else if (i === 0) {
                quantityArray.push(
                    <Button mode="ghost" radius={0} shadow={1} padding={1} onClick={(event) => { handleClick(0, card) }} key={0}>0</Button>
                )
            } else {
                quantityArray.push(
                    <Button mode="ghost" radius={0} shadow={1} padding={1} key={i} onClick={(event) => { handleClick(i, card, isvalue) }}>{i}</Button>
                )
            }
        }
        return quantityArray
    }


    return (
        <FormField
            description={type.description}
            title={type.title}
            __unstable_markers={markers}
            __unstable_presence={presence}
            compareValue={compareValue}
        //ref={ref}
        >
            <Flex>
                <Box flex="1">
                    <Box marginY="3">
                        <Label>Deck:</Label>
                    </Box>
                    {deck.map((card, index) =>
                        <Box key={index}>
                            <Stack>
                                <Card shadow={1} padding={2}>
                                    <Flex align="center">
                                        <Box flex="1">
                                            <Text>{card.name}</Text>
                                        </Box>
                                        <Flex flex="1" justify="flex-end">
                                            {createQuantity(card.quantity, card, value)}
                                        </Flex>
                                    </Flex>
                                </Card>
                            </Stack>
                        </Box>
                    )}
                    <Box marginY="3">
                        {deck.length ? <Button tone="caution" onClick={clearReferences}>Remove all cards</Button> : <Text>Empty deck! Select cards from the cardpool on the right -{`>`}</Text>}
                        
                    </Box>
                </Box>
                <Box flex="1" marginLeft={[2, 2, 3, 3]}>
                    <Box marginY="3">
                        <Label>Cardpool:</Label>
                    </Box>
                    {cardList.map((card, index) =>
                        <Box key={index}>
                            <Stack>
                                <Card shadow={1} padding={2}>
                                    <Flex align="center">
                                        <Box flex="1">
                                            <Text>{card.name}</Text>
                                        </Box>
                                        <Flex flex="1" justify="flex-end">
                                            {createQuantity(card.quantity, card, value)}
                                        </Flex>
                                    </Flex>
                                </Card>
                            </Stack>
                        </Box>
                    )}
                </Box>
            </Flex>
        </FormField>
    )
})




export default FilterCards;
