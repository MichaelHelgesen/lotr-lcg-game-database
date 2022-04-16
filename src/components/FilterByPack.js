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
            <Card radius={0} shadow={1} padding={2} style={{ textAlign: 'center' }}>
                <Box onClick={onOpen}>
                    <Text size="1">Packs</Text>
                </Box>
            </Card>

            {
                open && (
                    <Dialog
                        header="Example"
                        id="dialog-example"
                        onClose={onClose}
                        zOffset={1000}
                    >
                        <Box padding={4}>
                            <Text>Content</Text>
                        </Box>
                    </Dialog>
                )
            }
        </Box>
    )
})

export default FilterByPack