
import React from 'react';
import SelectComponent from '../components/SelectComponent';
import axios from "../api/axios"

export default function UploadPage(){

    const[category, setCategory] = React.useState('CSE');
    const categories = ["CSE", "EEE"];

    const[uploadedFileName, setUploadedFileName] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState('');

    const[year, setYear] = React.useState(2021);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2017 + 1 }, (_, index) => 2017 + index);

    const handleFileUpload = async(event) => {
        const file = event.target.files[0];

        if (file.name.endsWith('.xlsx')) {
            setUploadedFileName(file.name);
            setErrorMessage('');
          } else {
            setErrorMessage('Molim vas uploadajte datoteku s .xlsx proširenjem.');
            setUploadedFileName('');
        }

        const formData = new FormData();
        formData.append("category", category);
        formData.append("year", year);
        formData.append("file", file);


        try {
            const response = await axios({
              method: "post",
              url: "/upload",
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            });
          } catch(error) {
            console.log(error)
          }
      };

    return(
        <div style={{height:'100vh', backgroundColor:'#c1cbdb'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
                <div>
                    <SelectComponent value={category} setValue={setCategory} values={categories} desc='Kategorija'></SelectComponent>
                </div>
                <div>
                    <SelectComponent value={year} setValue={setYear} values={years} desc='Godina'></SelectComponent>
                </div>
            </div>
            <div style={{ marginTop: 40 }}>
                <input
                    type="file"
                    id="fileUpload"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                />
                <label htmlFor="fileUpload" style={{ backgroundColor: 'green', borderRadius: '10px', color: 'white', padding: '10px', cursor: 'pointer' }}>
                    Upload File
                </label>
                {uploadedFileName && <span style={{ marginLeft: '10px' }}>{uploadedFileName}</span>}
                {errorMessage && <span style={{ color: 'red', marginLeft:'10px' }}>{errorMessage}</span>}
             </div>

        </div>
        
    );

}

export { UploadPage };