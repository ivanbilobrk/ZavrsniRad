import UniTable from "../components/UniTable";
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';


export default function TablePage(){

    const location = useLocation()
    const { category } = queryString.parse(location.search)

    return(
        <>
            <Link to="/">
                <HomeIcon />
            </Link>
            <UniTable category = {category}/>
        </>
        
    );

}

export { TablePage };