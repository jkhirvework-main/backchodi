import { getHistory } from '@/app/user/actions/UserAction'
import { Box, Container } from '@mui/material';
import HistoryContainer from './(Components)/HistoryContainer';


export default async function HistoryPage() {
    const history = await getHistory();



    const infoHistory = history.reduce((acc, curr) => {
        if (curr.type === 'info') {
            acc.push(curr);
        }
        return acc;
    }, [])

    const dtcHistory = history.reduce((acc, curr) => {
        if (curr.type === 'dtc') {
            acc.push(curr);
        }
        return acc;
    }, []);




    return (
        <main>
            <Container maxWidth={'xl'} sx={{ py: { xl: 2, lg: 2, md: 2, sm: 0, xs: 0 }, px: { xs: 0, sm: 0, xl: 3, lg: 3, md: 0 } }}>

                <Box sx={{ mt: 0 }}>
                    <HistoryContainer infoHistory={infoHistory} dtcHistory={dtcHistory}/>
                </Box>
            </Container>
        </main>

    )
}
