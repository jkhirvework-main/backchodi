import { Box, Container, Grid, Typography } from "@mui/material";
import { Montserrat } from "next/font/google";
import CenteredBox from "../../widgets/secondary/CenterBox";
import Image from "next/image";
import MainSectionHeader from "../../widgets/secondary/MainSectionHeader";
import TabletSection from "@/sections/TabletSection";
import MobileSection from "@/sections/MobileSection";
import YTSection from "@/sections/YTSection";
import PriceSection from "@/sections/PriceSection";
import MainFooter from "@/sections/MainFooter";
import PersonalAssistantSection from "@/sections/PersonalAssistantSection";
import VideoList from "@/widgets/secondary/VideoList";
import AlarmSection from "@/sections/AlarmSection";
import PdfListSection from "@/sections/PdfListSection";
import InstallAppSection from "@/sections/InstallAppLightSection";
import SampleData from "@/utils/SampleData";
import LinksSection from "@/sections/LinksSection";


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400']
});



export default function Home() {
  // sx={{ pt: 28, pb: 24 }}
  return (
    <main >
      <Box sx={{ backgroundColor: '#fff' }}>
        <Box sx={{ backgroundColor: '#152329' }}>
          <Container maxWidth={'xl'} sx={{ py: {xl: 16, lg: 16, md: 8, sm: 8, xs: 8} }}>
            <Grid container columnSpacing={4} rowSpacing={6} alignItems="center" >
              <Grid item lg={6} xl={6} sm={12} xs={12}>
                <CenteredBox>
                  <Typography color={'white'} className={montserrat.className} variant="h4" >The Worlds Most  Accurate Unit Testing  Generative AI.</Typography>
                  <Typography variant="body2" sx={{ mt: 2 }} color={'#ABABAB'}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia. </Typography>
                </CenteredBox>
              </Grid>
              <Grid item lg={6} xl={6} sm={12} xs={12}>
                {/* justifyContent={{lg: 'right', xl: 'right', md: 'center', sm: 'center', xl: 'center'}} justifyItems={{lg: 'right', xl: 'right', md: 'center', sm: 'center', xl: 'center'}} */}
                <Box display={'flex'} justifyContent={'right'} justifyItems={'right'}>
                  <Box style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden' }}>
                    <Image alt="" quality={50} layout="intrinsic" src={'/home/images/test2.jpg'} width={458} height={458} objectFit="cover" priority/>
                  </Box>
                </Box>

              </Grid>
            </Grid>
          </Container>
        </Box>

        <TabletSection />
        <MobileSection />
        <YTSection />
        <PriceSection />
        <PersonalAssistantSection />
        <VideoList videos={SampleData.videos} />
        <AlarmSection />
        <PdfListSection list={SampleData.pdfList}/>
        <InstallAppSection isDark={false}/>
        <LinksSection links={SampleData.links}/>

        <MainFooter />
      </Box>
    </main>
  );
}
