import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GraphUni from '../components/GraphUni';


export default function RankingUniPage(){

    const location = useLocation()
    const { category, uni } = queryString.parse(location.search)

    return(
        <>
            <div style={{fontSize:'2em'}}>{uni}</div>
            <div style={{display:'flex', justifyContent:'center', marginTop:'2em'}}>
                <Accordion sx={{width:'50%'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                            <Typography>Ranking sveučilišta {uni} kroz godine</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <GraphUni uni = {uni} category = {category} factor = 'position'/>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    );

}

export { RankingUniPage };