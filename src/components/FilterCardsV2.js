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

    return (
        <FormField
            title={type.title}
        >
            <Flex>
                <Box flex="1">
                    <DeckList cardList={cardList} value={value} onChange={onChange}/>
                </Box>
                <Box flex="1">
                    <CardList cardList={cardList} value={value} />
                </Box>
            </Flex>
        </FormField>

    )

})

export default FilterCardsV2;
