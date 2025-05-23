'use client'

import { sendOtp } from "@/app/user/actions/UserAction";
import Utils from "@/utils/Utils";
import CustomCheckbox from "@/widgets/mui/elements/CustomCheckbox";
import CustomFormLabel from "@/widgets/mui/elements/CustomFormLabel";
import CustomTextField from "@/widgets/mui/elements/CustomTextField";
import Link from "next/link";
import { useState } from "react";
import OTPInput from "react-otp-input";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { useRouter } from 'next/navigation';


const { Typography, Stack, Box, FormGroup, FormControlLabel, Button, Autocomplete, TextField } = require("@mui/material");

const AuthLogin = ({ title, subtitle, subtext }) => {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState("");
    const [isOptSend, setIsOtpSend] = useState('');
    const { push } = useRouter();
    const [mob, setMob] = useState(null);

    const handleChange = (code) => {
        setCode(code)
    };

    const btnHandler = async () => {
        if (!isOptSend) {
            const is = await sendOtp(phone);
            if (is) {
                setIsOtpSend(true);
            }
        }else {
            push('/user/auth/login/5345')
        }
    }


    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h3" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Stack>
                <Stack >



                    <Box>
                        <CustomFormLabel htmlFor="username">Mobile Number</CustomFormLabel>
                        <PhoneInput
                            country="in"
                            value={phone}
                            onChange={(phone) => setPhone(phone)}
                            specialLabel=""
                            inputStyle={{ paddingTop: 14, paddingBottom: 14, width: 360 }}
                        />

                        <Box sx={{ mt: 4, display: (isOptSend ? 'box' : 'none') }}>
                            <CustomFormLabel htmlFor="username" >Enter OTP</CustomFormLabel>
                            <OTPInput
                                value={code}
                                onChange={handleChange}
                                numInputs={6}
                                isInputNum={true}
                                renderInput={(props) => <input {...props} />}
                                shouldAutoFocus={true}
                                inputStyle={{
                                    border: "1px solid transparent",
                                    borderBottom: "1px solid grey",
                                    borderRadius: "0px",
                                    width: "46px",
                                    height: "46px",
                                    fontSize: "16px",
                                    color: "#000",
                                    fontWeight: "400",
                                    caretColor: "blue",
                                    marginRight: 12,
                                }}
                                focusStyle={{
                                    border: "1px solid #CFD3DB",
                                    outline: "none"
                                }}
                            />
                        </Box>


                        <Box sx={{ mt: 3 }}></Box>
                    </Box>

                </Stack>

                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <FormGroup>
                        <FormControlLabel
                            control={<CustomCheckbox defaultChecked />}
                            label="Remeber this Device"
                        />
                    </FormGroup>

                </Stack>
            </Stack>

            <Box>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={btnHandler}
                    type="submit"
                    sx={{ mt: 3 }}
                >
                    {!isOptSend ? 'Send Otp' : 'Login'}
                </Button>
            </Box>
        </>
    );
}

export default AuthLogin;