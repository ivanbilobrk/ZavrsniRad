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
    const [isAccordion3Expanded, setIsAccordion3Expanded] = React.useState(false);

    const location = useLocation()
    const { category, uni } = queryString.parse(location.search)
    const factors = ['Q1', 'CNCI', 'IC', 'TOP', 'AWARD', 'POSITION', 'TOTAL', 'SVI INDIKATORI']
    const factors2 = ['Q1', 'CNCI', 'IC', 'TOP', 'AWARD', 'POSITION', 'TOTAL']
    const [factor, setFactor] = React.useState('Q1');
    const [factor2, setFactor2] = React.useState('Q1');
    const [factor3, setFactor3] = React.useState('Q1');

    const currentYear = new Date().getFullYear();
    const startYear = 2017;
    const labels1 = [];

    const [labels2, setLabels2] = React.useState([])

    const [dataSets1, setDataSets1] = React.useState([])
    const [dataSets2, setDataSets2] = React.useState([])
    const [dataSets3, setDataSets3] = React.useState([])
    const colors = ['rgb(255, 99, 132)', 'rgb(0, 119, 255)', 'rgb(21, 255, 0)', 'rgb(0, 0, 0)', 'rgb(234, 255, 0)']

    for (let year = startYear; year <= currentYear; year++) {
      labels1.push(year);
    }

    async function getRanking(path, factor){
      const promises = [];
      for (let i = 2017; i <= new Date().getFullYear(); i++) {
        const promise = axios.get(`/${path}/?year=${i}&category=${category}&uni=${uni}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }).then((response) => {
          const yearData = response.data[factor.toLowerCase()];
          return yearData;
        });
        promises.push(promise);
      }
    
      const yearDataArray = await Promise.all(promises);
      return yearDataArray
    }

    async function getData1() {

      if(factor == 'SVI INDIKATORI'){
        const newDataSets = []

        for(let i = 0; i < factors.length-3; i++){
          let yearDataArray = await getRanking('rankingUni', factors[i]);
          newDataSets[i] = {
            label: factors[i],
            data: labels1.map((element) => yearDataArray[element - 2017]),
            borderColor: colors[i],
            backgroundColor: colors[i]
          }
        }
        setDataSets1(newDataSets);
      } else {
        const yearDataArray = await getRanking('rankingUni', factor)
        const newDataSets = [
          {
            label: factor,
            data: labels1.map((element) => yearDataArray[element - 2017]),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }
        ];
        setDataSets1(newDataSets);
      }
    }


    async function getData2() {
      const request = await axios.get(`/uniCurrentYear/?category=${category}&uni=${uni}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const response = request.data;
    
      const tempArray = response.map((item) => {
        const date = new Date(item['readingyear']);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const formattedMonth = month.toString().padStart(2, '0');
        return `${year} ${formattedMonth}`;
      });
    
      setLabels2(tempArray);
    
      const currentYearData = {};
      for (let i = 0; i < tempArray.length; i++) {
        currentYearData[tempArray[i]] = response[i];
      }
      
      if(factor2 == 'SVI INDIKATORI'){
        const dataSets = [];
        for(let i = 0; i < factors.length-3; i++){
          dataSets[i] = {
            label: factors[i],
            data: tempArray.map((element) => currentYearData[element][factors[i].toLocaleLowerCase()]),
            borderColor: colors[i],
            backgroundColor: colors[i]
          }
        }
        setDataSets2(dataSets)
      } else {
        setDataSets2([
          {
            label: factor2,
            data: tempArray.map((element) => currentYearData[element][factor2.toLocaleLowerCase()]),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ]);
      }
    }

    async function getData3() {
      const data1 = await getRanking('rankingReal', factor3)
      const data2 = await getRanking('rankingUni', factor3)

      const newDataSets = [

        {
          label: factor3+' Shanghai',
          data: labels1.map((element) => data1[element - 2017]),
          borderColor: 'rgb(0, 77, 255)',
          backgroundColor: 'rgba(0, 77, 255, 0.5)'
        },
        {
          label: factor3,
          data: labels1.map((element) => data2[element - 2017]),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
      ];

      setDataSets3(newDataSets)
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
                <GraphUni uni={uni} factor={factor} labels={labels1} dataFetch={getData1} isExpanded={isAccordion1Expanded} dataSets={dataSets1}/>
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
                <GraphUni uni={uni} factor={factor2} labels={labels2} dataFetch={getData2} isExpanded={isAccordion2Expanded} dataSets={dataSets2}/>
              </AccordionDetails>
            </Accordion>
          </div>

          <div style={{display:'flex', justifyContent:'center', marginTop:'2em'}}>
            <Accordion sx={{width:'50%'}} expanded={isAccordion3Expanded} onChange={() => setIsAccordion3Expanded(!isAccordion3Expanded)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Usporedba rankinga sveučilišta {uni} sa Shanghai rankingom</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SelectComponent value={factor3} setValue={setFactor3} values={factors2} desc='Faktor'></SelectComponent>

                <GraphUni uni={uni} factor={factor3} labels={labels1} dataFetch={getData3} isExpanded={isAccordion3Expanded} dataSets={dataSets3}/>
              </AccordionDetails>
            </Accordion>
          </div>

        </>
      );
    }

export { RankingUniPage };