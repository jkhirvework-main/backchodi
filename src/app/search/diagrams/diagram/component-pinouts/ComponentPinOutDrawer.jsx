'use client'

import { Container, Drawer } from "@mui/material";
import ComponentPinoutExpandableView from "./ComponentPinoutExpandableView";
import ComponentPinOutSection from "./ComponentPinOutSection";
import { useDispatch, useSelector } from "react-redux";
import { setPinOutDrawer } from "@/app/GlobalRedux/slice/viewer.sclice";
import ComponentCheckSection from "../component-checks/ComponentCheckSection";

export default function ComponentPinOutDrawer() {
    const pinOutDrawer = useSelector(state => state.viewerSclice.pinOutDrawer);

    const dispatch = useDispatch();

    return (

        <Drawer
            anchor={'right'}
            open={pinOutDrawer.isOpen}
            onClose={() => dispatch(setPinOutDrawer({ isOpen: false, preData: [] }))}
            
        >
            <Container maxWidth={'sm'}>
                

                <ComponentPinOutSection preData={pinOutDrawer.preData} />
            </Container>
            
        </Drawer>

    )
}
