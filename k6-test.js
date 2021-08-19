import { group, check, sleep } from "k6";
import { Counter, Rate, Trend } from "k6/metrics";
import http from "k6/http";

export let options = {
    stages: [
        { duration: "30s", target: 5 },
        { duration: "30s", target: 5 },
        { duration: "30s", target: 100 },
        { duration: "30s", target: 100 },
    ],
    // thresholds: {
    //     http_req_duration: [{ threshold: 'p(95) < 200', abortOnFail: true, delayAbortEval: '10s' }]
    // }
};

let myTrend1 = new Trend("waiting_time_create");
let myTrend2 = new Trend("waiting_time_delete");

export default function () {
    //  Create an item
    let dt = Date.now().toString();
    let payload = JSON.stringify({ title: "Item at " + dt, checked: 0 });
    let params = { headers: { 'Content-type': 'application/json' } };
    let res = http.post("http://web:3000/items",
        payload,
        params
    );
    check(res, {
        "status is 200": (res) => res.status === 200,
        "status isn't 200": (res) => res.status !== 200
    });
    myTrend1.add(Math.round(res.timings.duration) / 1000);


    //  Delete an item
    let item_id = JSON.parse(res.body).id;
    res = http.del("http://web:3000/items/" + item_id);
    check(res, {
        "status is 200": (res) => res.status === 200,
        "status isn't 200": (res) => res.status !== 200
    });
    myTrend2.add(Math.round(res.timings.duration) / 1000);

    sleep(10 * Math.random());
}