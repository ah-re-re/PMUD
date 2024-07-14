import { getRequest } from '@/hook/api'
import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
type Data = {
    _id: string,
    total: number
}


const RevenueAdmin = () => {
    const [data, setData] = useState<Array<Data>>([])
    useEffect(() => {
        try {
            (async () => {  
                let dt = await getRequest('/carts/all')
                setData(dt)
                console.log(dt)
            })()
        } catch (error) {
            console.log(error)
        }
    },[])
    return (
        <div>
            <Chart
                options={{
                    xaxis: {
                        categories: data.map(d => d._id)
                    }
                }}
                series={[{ name: "doanh thu",data: data.map(d => d.total) }]}
                type="bar"
                // width="500"
                height={"800"}
            />
            <Chart
                options={{
                    xaxis: {
                        categories: data.map(d => d._id)
                    }
                }}
                series={[{ name: "doanh thu",data: data.map(d => d.total) }]}
                type="line"
                // width="500"
                height={"800"}
            />
        </div>
    )
}

export default RevenueAdmin