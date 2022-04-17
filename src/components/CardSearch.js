import React, { useState } from 'react'
import CardListComponent from './CardListComponent';
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
const { cardList, selectValue, setSelectValue } = props

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
                    <Card as="button">
                        <Flex align="center">
                            <Box flex={1} padding={1}>
                                <Text size={[1]}>
                                    {option.name}
                                </Text>
                            </Box>
                        </Flex>
                    </Card>
                )}
                // custom value render function
                renderValue={(value, option) =>
                    option?.name || value
                }
                value={selectValue}
                onSelect={(value) => { console.log(cardList); setSelectValue(value) }}
            />
        </Card>
    )
})

export default CardSearch