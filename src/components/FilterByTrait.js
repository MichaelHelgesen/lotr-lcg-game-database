import React, { useState } from 'react'
import PackCheckBox2 from './PackCheckBox2';
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

export const FilterByTrait = React.forwardRef((props, ref) => {
    const { traitsList, filterList, setFilterList } = props
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
            <Card radius={0} shadow={1} padding={1} style={{ textAlign: 'center' }}>
                <Box onClick={onOpen}>
                    <Text size="1">Select Traits</Text>
                </Box>
            </Card>

            {
                open && (
                    <Dialog
                        width="100%"
                        header="Example"
                        id="dialog-example"
                        onClose={onClose}
                        zOffset={1000}
                    >
                        <Box padding={2}>
                            <PackCheckBox2 setFilterList={setFilterList} filterList={filterList} traitsList={traitsList}/>
                        </Box>
                    </Dialog>
                )
            }
        </Box>
    )
})

export default FilterByTrait