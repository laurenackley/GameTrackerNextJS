import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import {useRouter} from 'next/router';
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [dataResponse, setdataResponse] = useState([]);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndpoint = "http://localhost:3000/api/getdata-lib";
      const postData = {
        method: "Post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: id,
        }),
      }
      const response = await fetch(apiUrlEndpoint, postData);
      const res = await response.json();
      // console.log(res.games);
      setdataResponse(res.games);
    }
    getPageData();
  }, [router.query.id, router.isReady, id]);
  return (
    <div className="home">
      {dataResponse.map((game) => {
        return <div key={game.id}>{game.name} {game.description} {id}</div>;
      })}
      ;<h1>Test</h1>
    </div>
  );

  // const app = express();
  // const db = require('../lib/db');
  
}