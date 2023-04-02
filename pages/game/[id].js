import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { db } from "../../lib/db";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [dataResponse, setdataResponse] = useState([]);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndpoint = "http://localhost:3000/api/game";
      const postData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        }),
      };
      const response = await fetch(apiUrlEndpoint, postData);
      const res = await response.json();
      // console.log(res.games);
      setdataResponse(res.games);
    }
    getPageData();
  }, [router.query.id, router.isReady, id]);
  return (
    <div className="home">
      {dataResponse?.map((game) => {
        return (
          <div key={game.id}>
            {game.name} <br/>{game.description} {""}
          </div>
        );
      })}
      ;<h1>Test</h1>
    </div>
  );
}
