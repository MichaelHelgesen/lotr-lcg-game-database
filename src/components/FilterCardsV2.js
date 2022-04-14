import React, { useState, useEffect, useCallback } from "react";
import { FormField } from "@sanity/base/components";
import CardList from "./CardList";
import DeckList from "./DeckList";

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
    Dialog,
    Avatar,
    Autocomplete,
    SearchIcon

} from "@sanity/ui";
import FilterByPack from "./FilterByPack";

export const FilterCardsV2 = React.forwardRef((props, ref) => {

    // VARIABLES //
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

    // STATE HANDLING //
    const [cardList, SetCardList] = useState([])

    // FUNCTIONS //
    // Get all cards
    useEffect(() => {
        client.fetch(queryCardType).then((cards) => {
            SetCardList([...cards])
        })
    }, []
    )

    // Sort array by name
    const sortFunction = (a, b) => {
        let navnA = a.name.toUpperCase();
        let navnB = b.name.toUpperCase();
        if (navnA < navnB) {
            return -1;
        }
        if (navnA > navnB) {
            return 1;
        }
        return 0;
    }

    return (
        <FormField
            title={type.title}
        >
            <Flex>
                <Box flex="1">
                    <DeckList cardList={cardList.sort(sortFunction)} value={value} onChange={onChange}/>
                </Box>
                <Box flex="1" marginLeft={[2, 2, 3, 3]}>
                    <CardList cardList={cardList.sort(sortFunction)} value={value} onChange={onChange}/>
                </Box>
            </Flex>
        </FormField>

    )

})

export default FilterCardsV2;
