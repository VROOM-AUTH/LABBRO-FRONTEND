import React from "react";

export default function Vroomvolts({ userData, mergedUsers }) {
    const myVroomvolts = mergedUsers.find((user) => user.id === userData.userId).vroomvolts || 0;
    return <h1>Your Vroomvolts: {myVroomvolts}</h1>;
}
