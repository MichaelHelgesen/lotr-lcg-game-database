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

export const FilterByPack = React.forwardRef((props, ref) => {
    const { packs } = props

    return (
        <Box>
            Filter by pack
        </Box>
    )
})

export default FilterByPack