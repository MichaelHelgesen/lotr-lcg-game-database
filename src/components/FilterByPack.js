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
    const { sorting, onOpen, onClose, open } = props

    const packs = Object.keys(sorting)

    function filterByPack(val) {
        props.onClick(val);
    }

    return (
        <Box flex="1">
            <Card radius={0} shadow={1} padding={2} style={{ textAlign: 'center' }}>
                <Text align="center" size="1" onClick={onOpen}>Select packs</Text>
            </Card>

            {
                open && (
                    <Dialog
                        header="Choose packs to include in cardpool"
                        id="dialog-example"
                        cardShadow="4"
                        onClose={onClose}
                        zOffset={1000}
                    >
                        <Box padding={4}>
                            {packs.map(pack =>
                                <Card padding={4}>
                                    {console.log(sorting[pack])}
                                    <Flex align="center">
                                        {sorting[pack] ?
                                            <Checkbox checked id={pack} style={{ display: 'block' }} onClick={(event) => { filterByPack(pack) }} />
                                            :
                                            <Checkbox id={pack} style={{ display: 'block' }} onClick={(event) => { filterByPack(pack) }} />
                                        }

                                        <Box flex={1} paddingLeft={3}>
                                            <Text>
                                                <label htmlFor={pack}>{pack}</label>
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            )}
                        </Box>
                    </Dialog>
                )
            }
        </Box>
    )
})

export default FilterByPack