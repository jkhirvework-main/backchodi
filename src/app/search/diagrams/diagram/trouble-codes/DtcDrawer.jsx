'use client'

import { setDtcDrawer } from "@/app/GlobalRedux/slice/viewer.sclice";
import DtcSection from "@/app/search/dtc/components/DtcSection";
import { Box, Container, Drawer, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TroubleCodeSection from "./TroubleCodeSection";

export default function DtcDrawer() {
    const dtcDrawer = useSelector(state => state.viewerSclice.dtcDrawer);
    const dispatch = useDispatch();

    console.log(dtcDrawer.preData)

    return (
        <Drawer
            anchor={'right'}
            open={dtcDrawer.isOpen}
            onClose={() => dispatch(setDtcDrawer({ isOpen: false, preData: [] }))}
        >
            <Container maxWidth={'md'}>
                <Box >
                    <TroubleCodeSection data={dtcDrawer.preData} />
                </Box>
                
            </Container>
        </Drawer>
    )
}
