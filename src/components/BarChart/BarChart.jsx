import React, { useEffect } from "react";
import "./BarChart.css";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const MyBarChart = () => {
  let base_url = "http://127.0.0.1:8000/";

  const [dataUsers, setDataUsers] = useState(null);
  const [dataAttendance, setAttendance] = useState(null);
  const [userHours, setUserHours] = useState({});

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${base_url}users/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setDataUsers(data);
      })
      .catch((error) => {
        console.log("Error loading dataUsers! Try again later");
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  let users_identifiers = {};

  let dataGraph = [];
  if (dataUsers) {
    for (let entry of dataUsers) {
      users_identifiers[entry.id] = entry.name;
      fetch(`${base_url}users-time/?user_id=${parseInt(entry.id)}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          // setDataUsers(data);
          for (let entry of data) {
            dataGraph.push({
              name: users_identifiers[entry.user_id],
              hours: entry["total_hours"],
            });
            console.log(dataGraph);
          }
        })
        .catch((error) => {
          console.log("Error loading dataAttendance! Try again later");
          setError(true);
        })
        .finally(() => setLoading(false));
    }
    console.log(users_identifiers);
  }

  // let dataGraph = [
  //   {
  //     name: "giannis",
  //     hours: 15,
  //   },
  //   {
  //     name: "seba",
  //     hours: 13,
  //   },
  //   {
  //     name: "ankel",
  //     hours: 19,
  //   },
  //   {
  //     name: "re broo",
  //     hours: 10,
  //   },
  //   {
  //     name: "re brooo",
  //     hours: 21,
  //   },
  //   {
  //     name: "re broo",
  //     hours: 22,
  //   },
  //   {
  //     name: "re broo",
  //     hours: 24,
  //   },
  // ];
  return (
    <ResponsiveContainer width="100%" height="50%">
      <BarChart width={600} data={dataGraph}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0F3460" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0F3460" stopOpacity={0.0} />
            {/* <stop offset="100%" stopColor="#000000" stopOpacity={0} /> */}
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="color-stroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#16213E" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#16213E" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} ho />
        <XAxis dataKey="name" color="#16213E" />
        <YAxis />
        <Tooltip />
        <Legend color="#16213E" />
        <Bar
          dataKey="hours"
          fill="url(#color)"
          radius={10}
          stroke={"url(#color-stroke)"}
          strokeWidth={2}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;
