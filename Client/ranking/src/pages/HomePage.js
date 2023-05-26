import './../index.css'
import Button from '@mui/material/Button';

export default function HomePage(){

    function handleClick(category){
        const url = `/ranking?category=${category}`
        window.location.href = url;
    }

    function handleUpload(){
        window.location.href = 'upload';
    }

    return(
        <div style={{height:'100vh', backgroundColor:'#c1cbdb'}}>
            <div style={{fontSize:40}}>Ranking Sveučilišta</div>

            <div style={{marginTop:30}} className='buttonDiv'>
                <Button variant="outlined" sx={{mr:5, color:'#e6128a', fontSize:'1.5em'}} size = "large" onClick={()=>handleClick('CSE')}>CSE</Button>
                <Button variant="outlined" sx={{mr:5, color:'#e6128a', fontSize:'1.5em'}} size = "large" onClick={()=>handleClick('EEE')}>EEE</Button>
            </div>

            <div style={{marginTop:30}}>
                <Button variant="outlined" sx={{mr:5, color:'#e6128a', fontSize:'1.5em'}} size = "large" onClick={()=>handleUpload()}>Upload stvarnih ranking podataka</Button>
            </div>
            
        </div>
    );

}

export { HomePage };