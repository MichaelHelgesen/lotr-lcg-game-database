import React, { useState } from 'react'
import CardListComponent from './CardListComponent';
import CardDialog from './CardDialog';
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
    Checkbox,
    Autocomplete,
    SearchIcon
} from "@sanity/ui";

export const CardSearch = React.forwardRef((props, ref) => {
    const { cardList, traitsList, sphereList, setDeckList, size, value, onChange, deckList, filterList, selectValue, setSelectValue } = props
    const references = value.map(reference => reference._ref)

    const [open, setOpen] = useState(false)

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

    const selectedCard = cardList.filter(card => card._id == selectValue)
        console.log(selectedCard[0])

    return (
        <Card padding={[0]}>
            <Autocomplete
                radius="0"
                // custom search filter
                filterOption={(query, option) =>
                    option.name
                        .toLowerCase()
                        .indexOf(query.toLowerCase()) > -1
                }
                fontSize={[1]}
                icon={SearchIcon}
                openButton
                // options with `payload`
                options={cardList.map(card => ({ ...card, value: card._id }))}
                padding={[3]}
                placeholder="Type to select card from cardpool …"
                // custom option render function
                renderOption={(option) => (
                    <Box>{option.name}</Box>
                )}
                // custom value render function
                renderValue={(value, option) =>
                    option?.name || value
                }
                value={selectValue}
                onSelect={(value) => {
                    setSelectValue(value)
                    onOpen()
                }}
            />
            <CardDialog deckList={deckList} traitsList={traitsList} sphereList={sphereList} setDeckList={setDeckList} cardList={cardList} card={selectedCard[0]} onClose={onClose} open={open} size={size} value={value} onChange={onChange} setOpen={setOpen} />
        </Card>
    )
})

export default CardSearch