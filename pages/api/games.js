import { query } from "../../lib/db"
export default async function getAllGames (req, res) {

    try{
        const querySQL = "select * from game";
        const data = await query({ query: querySQL});

        res.status(200).json({games: data});
    }catch(error){
        res.status(500).json({error: error.message});
    }


}