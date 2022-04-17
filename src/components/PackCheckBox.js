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

export const PackCheckBox = React.forwardRef((props, ref) => {
    const { filterList, setFilterList, packList } = props
    const handleChange = (id) => {
        setFilterList(prevState => {
            return (
                {
                    ...prevState,
                    pack: prevState.pack.indexOf(id) != -1 ? prevState.pack.filter(pack => pack != id) : [...prevState.pack, id]
                }
            )
        }
        )
    }

    const checkBox = (pack) => {
        return (
            <Card padding={1} key={pack._id}>
                <Grid columns={[2, 3]} gap={[1, 2]} padding={1}>
                    <Flex align="flex-start">
                        <Checkbox checked={filterList.indexOf(pack._id) != -1 ? true : false} id={`${pack._id}`} style={{ display: 'block' }} onChange={(event) => { handleChange(pack._id) }} />
                        <Box paddingLeft={3}>
                            <Text>
                                <label htmlFor={`${pack._id}`}>{pack.name}</label>
                            </Text>
                        </Box>
                    </Flex>
                </Grid>
            </Card>
        )
    }

    return (
        <Box>
            {packList.map(pack => {
                return (checkBox(pack))
            })}

        </Box>
    )
})

export default PackCheckBox