// /src/MyCustomString.js

import React, { useState, useEffect } from "react";
import { FormField } from "@sanity/base/components";
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
        readOnly,
        placeholder,
        markers,
        presence,
        compareValue,
        onFocus,
        onBlur,
        onChange,
    } = props;
    const queryCardType = '*[_type == "card"]';

    // Adding all cards from database on load
    const [cardList, setCardList] = useState([]);

    // Adding and removing cards from deck
    const [deck, setDeck] = useState([]);

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
                            return [...prevState, { ...card, selected: numberOfExistingCards }].sort(function(a, b) {
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
        (num, card) => {

            console.log(card.selected)
            console.log(num)

            if (num > card.selected && num > 0) {
                console.log("higher number")
                const action = insert(
                    [{ _ref: card._id, _type: "reference" }],
                    "after",
                    [-1]
                );
                for (let i = card.selected; i < num; i++) {
                    onChange(PatchEvent.from(action).prepend(setIfMissing([])));
                }
                setDeck(prevState => {
                    return [...prevState.filter(existingCard => existingCard._id != card._id), { ...card, selected: num }].sort(function(a, b) {
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
                })

            } else if (num < card.selected && num > 0) {
                console.log("lower number")
                //console.log(props.parent.cardSelection.map(obj => obj._ref).indexOf(card._id))

                for (let i = card.selected; i > num; i--) {
                    let index = props.parent.cardSelection.map(obj => obj._ref).indexOf(card._id)
                    client
                        .patch(props.parent._id)
                        .unset([`cardSelection[${index}]`])
                        .commit()
                }

                setDeck(prevState => {
                    return [...prevState.filter(existingCard => existingCard._id != card._id), { ...card, selected: num }].sort(function(a, b) {
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
                })

            } else if (num === 0 && card.selected) {
                console.log("zero")
                client
                    .patch(props.parent._id)
                    .unset([`cardSelection[_ref == "${card._id}"]`])
                    .commit()
                setDeck((prevState) => {
                    return [...prevState.filter(existingCard => {
                        return (existingCard._id != card._id)
                    })].sort(function(a, b) {
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
                //onChange(PatchEvent.from(num ? set(inputValue) : unset()));
            }
        },
        [onChange]
    );

    const clearReferences = React.useCallback(
        // useCallback will help with performance
        (event) => {
            setDeck([]);
            const inputValue = [];
            // if the value exists, set the data, if not, unset the data
            onChange(PatchEvent.from(set(inputValue)));
        },
        [onChange] // Verdien å se etter for oppdatering
    );

    const createQuantity = (num, card) => {

        let quantityArray = [<span onClick={(event) => { handleClick(0, card) }} key={0}>0</span>]

        for (let i = 1; i <= num; i++) {
            if (card.selected && card.selected === i) {
                quantityArray.push(
                    <span style={{ background: "green" }} key={i}>{i}</span>
                )
            } else {
                quantityArray.push(
                    <span key={i} onClick={(event) => { handleClick(i, card) }}>{i}</span>
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
                {deck.map((card, index) => <li ref={ref} onFocus={onFocus} onBlur={onBlur} key={index}>{card.name} - Quantity to add: {createQuantity(card.quantity, card)} / {card.selected}</li>)}
            </ul>
            Carpool:
            <ul>
                {cardList.map((card, index) =>
                    <li key={index}>
                        {card.name} - Quantity to add: {createQuantity(card.quantity, card)} / {card.selected}
                    </li>)}
            </ul>
        </FormField>
    )
})




export default FilterCards;
