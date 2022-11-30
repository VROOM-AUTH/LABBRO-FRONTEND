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

  const [dataGraph, setdataGraph] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${base_url}users/`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setDataUsers(data);
        for (let i = 0; i < 10000; i++) {}
        getUserHours();
      })
      .catch((error) => {
        console.log("Error loading dataUsers! Try again later" + error);
        setError(true);
      })
      .finally(() => setLoading(true));
  }, []);

  let users_identifiers = {};
  // let dataGraph = [];
  const getUserHours = () => {
    setdataGraph([]);
    for (let entry of dataUsers) {
      users_identifiers[entry.id] = entry.name;
      console.log(users_identifiers[entry.id]);
      fetch(`${base_url}users-time/?user_id=${entry.id}`, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          setdataGraph((oldData) => [
            ...oldData,
            {
              name: users_identifiers[data.user_id],
              hours: data.total_hours,
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        })
        .finally(() => setLoading(true));
    }
    setLoading(false);
  };

  return (
    <ResponsiveContainer width="100%" height="50%">
      {loading && (
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
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
      )}
    </ResponsiveContainer>
  );
};

export default MyBarChart;
