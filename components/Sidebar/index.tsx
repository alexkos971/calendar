import React from "react";
// import Link from "next/link";

import styles from "./Sidebar.module.scss";
import Axios from "axios";
import { key } from "../../config/default.json";

import Tasks from "../Tasks";

// interface SidebarProps {
//     data: Object<Object>
// }

const Sidebar: React.FC = () => {
    const [weather, setWeather] = React.useState(null)
    const [data, setData] = React.useState([
        {
            "time": "09:00",
            "text": "Send a messasge"
        },
        {
            "time": "02:20",
            "text": "Sed a messasge"
        },
        {
            "time": "22:00",
            "text": "Sesge"
        },
        {
            "time": "19:00",
            "text": " messasge"
        },
        {
            "time": "19:00",
            "text": " messasge"
        },
        {
            "time": "19:00",
            "text": " messasge"
        },
    ])

    React.useEffect(() => {
        (async () => {
            let options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            const success = async (pos) => {
              let crd = pos.coords;   

              const {data} = await Axios.get(`//api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${key}`)
  
              if (data) {
                  setWeather({
                      temp: Math.ceil((data.main.temp) - 273.14),
                      description: (data.weather[0].description).toUpperCase(),
                      region: data.name 
                  });
              }
              else {
                  setWeather(null)
              }
            };
          
            const error = (err) => {
              console.warn(`ERROR(${err.code}): ${err.message}`);
            };
            
            navigator.geolocation.getCurrentPosition(success, error, options);

        })()
    }, [])

    return (
        <div className={styles.sidebar}>

            <div className={styles.weather}>
            {weather ?
                <>
                    <img src="/static/cloud.png"/>

                    <h1>{weather.region}</h1>
                    <h2>{weather.temp}° С</h2>
                    <h2>{weather.description}</h2>
                    {/* <Link href="/weather"><p>Get more about weather</p></Link> */}
                </>
                    :
                <>
                    <img src="/static/not-found.png"/>
                    <h2>Weather for your region not found...</h2>
                </>
                }
            </div>

                <Tasks data={data} setData={setData}/>
        </div>
    )
}

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
export default Sidebar;

// export const getServerSideProps = async () => {
//     const url = `api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`
//     try {
//         console.log('dsd')
//         const {data} = await Axios.get(url);
//         if (data){
//             console.log(data)
//             // return {
//             //     props: { data }
//             // }
//         } 
//         else {
//             console.log(data)
//             return {
//                 error: true
//             }
//         }
//     }
//     catch (e) { console.log(e)}
//     // return {props: {}}    
// }