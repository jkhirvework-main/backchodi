import { Box } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SectionTextHeading from "./SectionTextHeading";
import Link from "next/link";

export default function SectionIconHeading(props) {
  return (
    <Box display={'flex'} alignContent={'center'} alignItems={'center'} sx={{ py: 4 }}>
      {props.icon}
      <Box sx={{ ml: 2 }}> </Box>
      <SectionTextHeading  {...props} />
      <Box flexGrow={1}></Box>
      <Box display={'flex'} sx={{
        '& a': {
          color: '#006AD3',
          fontSize: '14px'
        }, mt: 1


      }} alignContent={'center'}>
        <Link href={''} color='#006AD3' fontSize={13}>Go to section </Link>
        <NavigateNextIcon fontSize='small' sx={{ ml: 1, color: '#006AD3' }}></NavigateNextIcon>
      </Box>
    </Box>
  )
}
