import {useEffect, useState} from "react";
import request from "@/api/request.ts";
import {Response} from "@/types";


const Disk = () => {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    request.get<Response>('/api/disk')
      .then((res) => {
        console.log(res.data.data.records)
        setItems(res.data.records.map((item: { id: number }) => item.id.toString()))
        // eslint-disable-next-line no-debugger
        // debugger;
      }).catch((err) => {
      console.log(err)
    });

  },[]);

  return (
    <div>
      {items.map(item => {
        return <div key={item.id}>{item}</div>
      })}
    </div>
  );
}
export default Disk;
