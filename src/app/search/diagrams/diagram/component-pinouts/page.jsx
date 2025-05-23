import { Box, Container } from "@mui/material"
import ComponentPinOutSection from "./ComponentPinOutSection"

export default function page() {



    return (
        <Box>
            <Container maxWidth={'md'}>
                <ComponentPinOutSection preData={[]} />
            </Container>
        </Box>
    )
}
