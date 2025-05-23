'use client'

import CustomCheckbox from '@/widgets/mui/elements/CustomCheckbox'
import CustomFormLabel from '@/widgets/mui/elements/CustomFormLabel'
import CustomTextField from '@/widgets/mui/elements/CustomTextField'
import { Box, Button, FormControlLabel, FormGroup, Stack } from '@mui/material'
import React from 'react'

export default function RegisterComponent() {

    
  const btnHandler = () => {

  }
    return (
        <Box>
            <Stack direction={'row'} spacing={2}>


                <Box>
                    <CustomFormLabel >First Name</CustomFormLabel>
                    <CustomTextField placeholder="john" />
                </Box>
                <Box>
                    <CustomFormLabel >Last Name</CustomFormLabel>
                    <CustomTextField placeholder="deu" />
                </Box>
            </Stack>

            <Box>
                <CustomFormLabel >Email</CustomFormLabel>
                <CustomTextField fullWidth placeholder="john-deu@gmail.com" />
            </Box>

            <Box>
                <CustomFormLabel >Workshop Name</CustomFormLabel>
                <CustomTextField fullWidth placeholder="carclinic" />
            </Box>


            <Box>
                <CustomFormLabel >Location</CustomFormLabel>
                <CustomTextField fullWidth placeholder="balaghat - (M.P)" />
            </Box>

            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                <FormGroup>
                    <FormControlLabel
                        control={<CustomCheckbox defaultChecked />}
                        label="Accept terms & conditions"
                    />
                </FormGroup>

            </Stack>

            <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                onClick={btnHandler}
                type="submit"
                sx={{ mt: 3 }}
            >
                REGISTER
            </Button>
        </Box>

    )
}
