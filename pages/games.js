import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ListAllGames() {
  const router = useRouter();
  const [dataResponse, setdataResponse] = useState([]);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndpoint = "http://localhost:3000/api/games";
      const getData = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify()
      };
      const response = await fetch(apiUrlEndpoint, getData);
      const res = await response.json();

      setdataResponse(res.games);
    }
    getPageData();
  }, [router.query, router.isReady]);
  return (
    <div className="ListAllGames">
        {dataResponse?.map((game)=>{
            return(
                <div key="game">
               <h1>{game.name}</h1> <br />{game.description}<br/>
               Player minimum: {game.player_minimum}<br/>
               Player maximum: {game.player_maximum}
               <hr/>
                </div>
            )
        })}


    </div>
  )

}
