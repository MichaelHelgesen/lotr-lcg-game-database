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
    const { cardList, value, onChange, filterList, selectValue, setSelectValue } = props
    const references = value.map(reference => reference._ref)
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
                    <CardListComponent
                        card={option}
                        size={1}
                        value={
                            references.filter(reference => reference === option._id)
                        }
                        onChange={onChange}
                    />

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