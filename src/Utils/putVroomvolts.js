function putVroomvolts(vroomvolts, id) {
    fetch(`${process.env.REACT_APP_BASE_URL}users-levels/${id}`, {
        method: "PUT",
        headers: {
            // "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
            vroomvolts: vroomvolts,
            should_update: 0,
        }),
    });
}

export default putVroomvolts;
