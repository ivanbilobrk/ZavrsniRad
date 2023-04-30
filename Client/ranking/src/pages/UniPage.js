import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GraphUni from '../components/GraphUni';
import React from 'react';
import SelectComponent from '../components/SelectComponent';
import axios from '../api/axios';


export default function RankingUniPage(){

    const [isAccordion1Expanded, setIsAccordion1Expanded] = React.useState(false);
    const [isAccordion2Expanded, setIsAccordion2Expanded] = React.useState(false);

    const location = useLocation()
    const { category, uni } = queryString.parse(location.search)
    const factors = ['Q1', 'CNCI', 'IC', 'TOP', 'AWARD', 'POSITION']
    const [factor, setFactor] = React.useState('Q1');
    const [factor2, setFactor2] = React.useState('Q1');

    const [yearData, setYearData] = React.useState({});
    const currentYear = new Date().getFullYear();
    const startYear = 2017;
    const labels1 = [];

    const [labels2, setLabels2] = React.useState([])
    const [currentYearData, setCurrentYearData] = React.useState({})

    
  
    for (let year = startYear; year <= currentYear; year++) {
      labels1.push(year);
    }

    async function getData1() {
        for (let i = 2017; i <= new Date().getFullYear(); i++) {
            const request = await axios.get(`/rankingUni/?year=${i}&category=${category}&uni=${uni}`, {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            });
            const response = request.data;
            setYearData((prevData) => ({ ...prevData, [i]: response[factor.toLowerCase()]}));
        }
    }



    async function getData2() {
        const request = await axios.get(`/uniCurrentYear/?category=${category}&uni=${uni}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const response = request.data;
      
        const tempArray = response.map(item => {
          const date = new Date(item['readingyear']);
          const year = date.getFullYear();
          const month = date.getMonth() + 1; 
          const formattedMonth = month.toString().padStart(2, '0'); 
          return `${year} ${formattedMonth}`;
        })
      
        setLabels2(tempArray);
      
        const currentYearData = {};
        for (let i = 0; i < tempArray.length; i++) {
          currentYearData[tempArray[i]] = response[i][factor2.toLowerCase()];
        }
        setCurrentYearData(currentYearData);
      }
      



      return (
        <>
          <div style={{fontSize:'2em'}}>{uni}</div>
          <div style={{display:'flex', justifyContent:'center', marginTop:'2em'}}>
            <Accordion sx={{width:'50%'}} expanded={isAccordion1Expanded} onChange={() => setIsAccordion1Expanded(!isAccordion1Expanded)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Ranking sveučilišta {uni} kroz godine</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SelectComponent value={factor} setValue={setFactor} values={factors} desc='Faktor'></SelectComponent>
                <GraphUni uni={uni} factor={factor} dataBit={yearData} labels={labels1} dataFetch={getData1} isExpanded={isAccordion1Expanded} />
              </AccordionDetails>
            </Accordion>
          </div>
          <div style={{display:'flex', justifyContent:'center', marginTop:'2em'}}>
            <Accordion sx={{width:'50%'}} expanded={isAccordion2Expanded} onChange={() => setIsAccordion2Expanded(!isAccordion2Expanded)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Ranking sveučilišta {uni} tijekom ove godine</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SelectComponent value={factor2} setValue={setFactor2} values={factors} desc='Faktor'></SelectComponent>
                <GraphUni uni={uni} factor={factor2} dataBit={currentYearData} labels={labels2} dataFetch={getData2} isExpanded={isAccordion2Expanded} />
              </AccordionDetails>
            </Accordion>
          </div>
        </>
      );
    }

export { RankingUniPage };