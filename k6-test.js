import { group, check, sleep } from "k6";
import { Counter, Rate } from "k6/metrics";
import http from "k6/http";

export let options = {
 stages: [
    { duration: "30s", target: 20 },
    { duration: "1m30s", target: 10  },
    { duration: "20s", target: 100 },
  ]
};

export default function() {
//  Create an item
    let dt = Date.now().toString();
    let payload = JSON.stringify({title:"Item at " + dt,checked:0});
    let params = { headers:{'Content-type': 'application/json'}};
    let res = http.post("http://web:3000/items",
        payload,
        params
        );
    check(res, {
        "status is 200": (res) => res.status === 200
    });

//  Delete an item
    let item_id = JSON.parse(res.body).id;
    res = http.del("http://web:3000/items/" + item_id);
    check(res, {
        "status is 200": (res) => res.status === 200
    });

    sleep(10 * Math.random());
}