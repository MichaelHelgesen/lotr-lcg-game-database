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
                    if(numberOfExistingCards) {
                        setDeck(prevState => {
                            return [...prevState, {...card, selected: numberOfExistingCards}]
                        })
                    }
                    return { ...card, selected: numberOfExistingCards }
                })
            )

        })
    }, []);

    const handleClick = React.useCallback(
        (num, card) => {
            setDeck(prevState => {
                return [...prevState.filter(existingCard => existingCard._id != card._id), { ...card, selected: num }]
            })
            const action = insert(
                [{ _ref: card._id, _type: "reference" }],
                "after",
                [-1]
            );
            onChange(PatchEvent.from(action).prepend(setIfMissing([])));

        },
        [onChange]
    );
    console.log("deck", deck)

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

        let quantityArray = []
        for (let i = 0; i < num; i++) {
            quantityArray.push(
                <span onClick={(event) => { handleClick(i + 1, card) }}>{i + 1}</span>
            )
        }
        return quantityArray
    }


    return (
        <div>
            <p onClick={clearReferences}>Clear references</p>
            Deck:
            <ul>
                {deck.map((card, index) => <li key={index}>{card.name} - Quantity added to deck: {card.selected} / {createQuantity(card.quantity, card)}</li>)}
            </ul>
            Carpool:
            <ul>
                {cardList.map((card, index) =>
                    <li key={index}>
                        {card.name} - Quantity to add: {createQuantity(card.quantity, card) } / {card.selected}
                    </li>)}
            </ul>
        </div>
    )
})




export default FilterCards;
