import React from 'react';
import Marquee from "react-fast-marquee";

function Marquees() {
    const topic = ["Sanat","Spor", "Ekonomi", "Tarih " , "Siyaset", "Sondakika","Spor", "Ekonomi", "Tarih " , "Siyaset", "Sondakika"               ]
    return (
        <div className='m-5'>
            <Marquee>
                <div className='flex items-center gap-x-12 font-semibold'>
                    {topic.map((item, i)=>{
                        return <h1 key={i}>#{item}</h1>

                    })}
                 
                </div>

            </Marquee>
        </div>
    )
}

export default Marquees