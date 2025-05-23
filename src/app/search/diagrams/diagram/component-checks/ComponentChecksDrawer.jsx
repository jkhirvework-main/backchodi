'use client'

import { setCompChecksDrawer } from "@/app/GlobalRedux/slice/viewer.sclice";
import { Container, Drawer } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComponentCheckSection from "./ComponentCheckSection";

export default function ComponentChecksDrawer() {

    const checksDrawer = useSelector(state => state.viewerSclice.compChecksDrawer);
    const dispatch = useDispatch();

    console.log(checksDrawer.preData)

    return (
        <Drawer
            anchor={'right'}
            open={checksDrawer.isOpen}
            onClose={() => dispatch(setCompChecksDrawer({ isOpen: false, preData: [] }))}

        >
            <Container maxWidth={'md'}>
            <ComponentCheckSection rows={checksDrawer.preData} />
            </Container>
        </Drawer>
    );
}
