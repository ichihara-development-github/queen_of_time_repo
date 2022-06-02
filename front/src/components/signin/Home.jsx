import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export const Home = () => {
    
    return (
        <>
         <Link to="/signup">
            <Button color="primary" variant="contained">
                サインアップ
            </Button>

        </Link>
         <Link to="/login">
         <Button color="success" variant="contained">
             ログイン
         </Button>

     </Link>
        </>       

    )
}
