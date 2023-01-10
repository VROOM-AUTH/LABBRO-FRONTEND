import React, { useEffect, useState } from "react";
import "./Marathon.css";

export default function Marathon() {
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [marathonData, setMaratonData] = useState([]);
    const [idToName, setIdToName] = useState([]);
    const [namesAndTime, setNamesAndTime] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}users-time/`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                console.log(data);
                data.sort((a, b) => b.total_seconds - a.total_seconds);
                console.log("Sorted Data is:");
                console.log(data);
                setMaratonData(data);
                setLoading1(false);
            });
        fetch(`${process.env.REACT_APP_BASE_URL}users/?fields=id,name`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setIdToName(data);
                setLoading2(false);
                // const map = marathonData.map((item1) => {
                //     const matchingItem = idToName.find(
                //         (item2) => item2.id === item1.id
                //     );
                //     return {
                //         name: item1.name,
                //         time: matchingItem ? matchingItem.time : null,
                //     };
                // });
                // setIdToName(map);
                // console.log(idToName);
            });
    }, []);

    // useEffect(() => {
    //     if (!loading1 && !loading2) {
    //         const map = marathonData.map((item1) => {
    //             const matchingItem = idToName.find(
    //                 (item2) => item2.id === item1.id
    //             );
    //             return {
    //                 name: item1.name,
    //                 time: matchingItem ? matchingItem.time : null,
    //             };
    //         });
    //         setNamesAndTime(map);
    //         console.log(namesAndTime);
    //     }
    // }, [loading1, loading2]);

    return (
        <div className="marathon">
            {loading1 && loading2 ? (
                <></>
            ) : (
                <div>
                    <p>
                        First is{" "}
                        {
                            idToName.find(
                                (o) => o.id === marathonData[0].user_id // SEARCHES FOR the objects whos id is the id of the first in the time array
                            ).name
                        }
                    </p>
                    <p>
                        Second is{" "}
                        {
                            idToName.find(
                                (o) => o.id === marathonData[1].user_id // SEARCHES FOR the objects whos id is the id of the first in the time array
                            ).name
                        }
                    </p>
                    <p>
                        Third is{" "}
                        {
                            idToName.find(
                                (o) => o.id === marathonData[2].user_id // SEARCHES FOR the objects whos id is the id of the first in the time array
                            ).name
                        }
                    </p>
                </div>
            )}
        </div>
    );
}
