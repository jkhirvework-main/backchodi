'use client'

import { setSingleDtcDrawer } from "@/app/GlobalRedux/slice/viewer.sclice"
import { Container, Drawer } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import DtcSection from "./DtcSection";

export default function SingleDtcDrawer() {

    const dispatch = useDispatch();
    const singleDtcDrawer = useSelector(state => state.viewerSclice.singleDtcDrawer);
    return (
        <Drawer
            anchor={'right'}
            open={singleDtcDrawer.isOpen}
            onClose={() => dispatch(setSingleDtcDrawer({ isOpen: false, preData: {} }))}
        >

            <Container maxWidth={'md'}>
                <DtcSection data={singleDtcDrawer.preData} />
            </Container>

        </Drawer>
    )
}
