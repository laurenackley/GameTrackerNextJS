import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import AddGame from "./addGame";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [dataResponse, setdataResponse] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndpoint = "http://localhost:3000/api/games";
      const getData = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        }),
      };
      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();
      setdataResponse(res.games);
    }
    getPageData();
  }, [router.query.id, router.isReady, id]);

  return (
    <div className="home">
      {dataResponse.map((game) => {
        return (
          <div key={game.id}>
            {game.name}<br/> {game.description} <hr/>
          </div>
        );
      })}

      <h1>Test</h1>
<AddGame/>
    </div>
  );
}
