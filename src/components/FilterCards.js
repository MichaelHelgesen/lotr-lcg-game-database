import React, { useState, useEffect, useCallback } from "react";
import { FormField } from "@sanity/base/components";
import FilterBySpheres from "./FilterBySpheres";
import FilterByType from "./FilterByType";
//import FilterByPack from "./FilterByPack";
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

    const [open, setOpen] = useState(false)


    // List that is copy from original list. This is for filtering etc.
    const [cardList, setCardList] = useState([]);

    // Adding and removing cards from deck
    const [deck, setDeck] = useState([]);

    // Object for sorting
    const [sorting, setSorting] = useState({
        sphere: {},
        pack: {},
        type: {}
    });

    // Adding all cards from database on load and update quantity
    const [originalCardList, setOriginalCardList] = useState([])

    function filterBySphere(sphere) {
        setSorting(prevState => {
            const oldObj = { ...prevState.sphere }
            for (const key in oldObj) {
                if (oldObj[key]) {
                    oldObj[key] = false
                }
            }
            return {
                ...prevState,
                sphere: {
                    ...oldObj,
                    [sphere]: true
                }
            }

        })
    }

    function filterByType(type) {
        setSorting(prevState => {
            const oldObj = { ...prevState.type }
            for (const key in oldObj) {
                if (oldObj[key]) {
                    oldObj[key] = false
                }
            }
            return {
                ...prevState,
                type: {
                    ...oldObj,
                    [type]: true
                }
            }

        })
    }

    function filterByPack(pack) {
        setSorting(prevState => {
            //const oldObj = { ...prevState.pack }
            /* for (const key in oldObj) {
                if (oldObj[key]) {
                    oldObj[key] = false
                }
            } */
            return {
                ...prevState,
                pack: {
                    //...oldObj,
                    [pack]: !prevState.pack[pack]
                }
            }

        })
    }

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

    const createCardObjects = (arr) => {
        return arr.map(card => {
            // Change this
            setSorting(prevState => {
                return {
                    ...prevState,
                    sphere: {
                        ...prevState.sphere,
                        [card.sphere._ref]: false
                    },
                    pack: {
                        ...prevState.pack,
                        [card.pack._ref]: false
                    },
                    type: {
                        ...prevState.type,
                        [card.cardType._ref]: false
                    }
                }
            })
            //--
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
    }

    const createCardObjects2 = (arr) => {
        return arr.map(card => {
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

    const onClose = React.useCallback(
        () => {
            setOpen(false)
        }, []
    );

    const onOpen = React.useCallback(
        () => {
            setOpen(true)
        }, []
    );

    //const onClose = useCallback(() => setOpen(false), [])
    //const onOpen = useCallback(() => setOpen(true), [])

    // First run to generate cardlist and deck if exists.
    useEffect(() => {
        client.fetch(queryCardType).then((cards) => {
            setOriginalCardList(createCardObjects(cards))
        })
    }, []);

    // First run to generate cardlist and deck if exists.
    /* useEffect(() => {
            setCardList(createCardObjects2([...originalCardList]))
    }, [originalCardList]); */

    // Update cardlist when references change
    useEffect(() => {
        setOriginalCardList(prevState => {
            return createCardObjects2(prevState)
        })
        setCardList(prevState => {
            return createCardObjects2(prevState)
        })

    }, [value]);

    useEffect(() => {
        let filterKey
        const oldObj = { ...sorting.sphere }
        for (const key in oldObj) {
            if (oldObj[key]) {
                filterKey = key
            }
        }
        let filterKey2
        const oldObj2 = { ...sorting.type }
        for (const key in oldObj2) {
            if (oldObj2[key]) {
                filterKey2 = key
            }
        }
        if (filterKey && !filterKey2) { setCardList([...originalCardList.filter(card => card.sphere._ref === filterKey)]) }
        if (filterKey2 && !filterKey) { setCardList([...originalCardList.filter(card => card.cardType._ref === filterKey2)]) }
        if (filterKey && filterKey2) { setCardList([...originalCardList.filter(card => card.sphere._ref === filterKey && card.cardType._ref === filterKey2)]) }
    }, [sorting]);

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
                    })].sort(sortFunction)
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
                    <Flex>
                        <FilterByPack sorting={sorting.pack} /* onClick={handleChange} */ onOpen={onOpen} onClose={onClose} open={open} onClick={filterByPack} />
                        <Card flex="1" radius={0} shadow={1} padding={2} style={{ textAlign: 'center' }}>
                            <Text align="center" size="1">Select trait</Text>
                        </Card>
                    </Flex>
                    <Box>
                        <FilterBySpheres sorting={sorting.sphere} onClick={filterBySphere} />
                    </Box>
                    <Box>
                        <FilterByType sorting={sorting.type} onClick={filterByType} />
                    </Box>
                    
                    {cardList.length ?
                        cardList.map((card, index) =>
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
                        )
                        :
                        originalCardList.map((card, index) =>
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
