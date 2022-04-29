import React, { useState } from 'react'
import TraitCheckBox from './TraitCheckBox';
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
            <Card radius={0} shadow={1} padding={2} style={{ textAlign: 'center' }} tone={`${filterList.length ? "positive" : ""}`}>
                <Box onClick={onOpen}>
                    <Text size="1">Select Traits</Text>
                </Box>
            </Card>

            {
                open && (
                    <Dialog
                        width="100%"
                        header="Select traits"
                        id="traits"
                        onClose={onClose}
                        zOffset={1000}
                    >
                            <TraitCheckBox setFilterList={setFilterList} filterList={filterList} traitsList={traitsList}/>
                    </Dialog>
                )
            }
        </Box>
    )
})

export default FilterByTrait