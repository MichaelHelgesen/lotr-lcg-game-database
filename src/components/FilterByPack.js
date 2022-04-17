import React, { useState } from 'react'
import PackCheckBox from './PackCheckBox';
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
    const { packList, filterList, setFilterList } = props
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

    return (
        <Box flex="1">
            <Card radius={0} shadow={1} padding={1} style={{ textAlign: 'center' }} tone={`${filterList.length ? "positive" : ""}`}>
                <Box onClick={onOpen}>
                    <Text size="1">Select Packs</Text>
                </Box>
            </Card>

            {
                open && (
                    <Dialog
                        width="100%"
                        header="Select Packs"
                        id="dialog-example"
                        onClose={onClose}
                        zOffset={1000}
                    >
                        <Box padding={2}>
                            <PackCheckBox setFilterList={setFilterList} filterList={filterList} packList={packList}/>
                        </Box>
                    </Dialog>
                )
            }
        </Box>
    )
})

export default FilterByPack