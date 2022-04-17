import React, { useState } from 'react'
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
    Checkbox
} from "@sanity/ui";

export const TraitCheckBox = React.forwardRef((props, ref) => {
    const { filterList, setFilterList, traitsList } = props

    console.log(filterList)

    const handleChange = (id) => {
        setFilterList(prevState => {
            return (
                {
                    ...prevState,
                    traits: prevState.traits.indexOf(id) != -1 ? prevState.traits.filter(trait => trait != id) : [...prevState.traits, id]
                }
            )
        }
        )
    }

    const checkBox = (trait) => {
        return (
            <Card padding={1} key={trait._id}>
                <Grid columns={[2, 3]} gap={[1, 2]} padding={1}>
                    <Flex align="flex-start">
                        <Checkbox checked={filterList.indexOf(trait._id) != -1 ? true : false} id={`${trait._id}`} style={{ display: 'block' }} onChange={(event) => { handleChange(trait._id) }} />
                        <Box paddingLeft={3}>
                            <Text>
                                <label htmlFor={`${trait._id}`}>{trait.name}</label>
                            </Text>
                        </Box>
                    </Flex>
                </Grid>
            </Card>
        )
    }

    return (
        <Box>
            {traitsList.map(trait => {
                return (checkBox(trait))
            })}

        </Box>
    )
})

export default TraitCheckBox