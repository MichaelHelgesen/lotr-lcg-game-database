// /src/MyCustomString.js

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
        let quantityArray = [<span onClick={(event) => { handleClick(0, card) }} key={0}>0</span>]
        for (let i = 1; i <= num; i++) {
            if (card.selected && card.selected === i) {
                quantityArray.push(
                    <span style={{ background: "grey" }} key={i}>{i}</span>
                )
            } else {
                quantityArray.push(
                    <span key={i} onClick={(event) => { handleClick(i, card, isvalue) }}>{i}</span>
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
            <p onClick={clearReferences}>Clear references</p>
            Deck:
            <ul>
                {deck.map((card, index) =>
                    <li ref={ref} onFocus={onFocus} onBlur={onBlur} key={index}>
                        {card.name} {createQuantity(card.quantity, card, value)}
                    </li>
                )}
            </ul>
            Carpool:
            <ul>
                {cardList.map((card, index) =>
                    <li key={index}>
                        {card.name} {createQuantity(card.quantity, card, value)}
                    </li>)}
            </ul>
        </FormField>
    )
})




export default FilterCards;
