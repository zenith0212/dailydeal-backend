import React, { useState, useEffect } from 'react';
import { ProfileTitle } from '../Store/StyledCom';
import styled from 'styled-components';
import Chart from 'react-apexcharts';
import { ExportButton } from '../Store/StyledCom';
import { base_url } from '../../config/config';
import formatDate from '../common/FormatDate';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const DateButton = styled.button`
    border: 1px solid #717171;
    border-radius: 4px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    color: #717171;
`

function SaleGraph() {

    const [data, setData] = useState([0,0,0,0,0,0,0]);
    const [categories, setCategories] = useState([0,0,0,0,0,0]);
    const today = new Date();
    var pointers = 12;

    // console.log('=======>',formatDate(start_date.setDate(today.getDate()-365)));
    const chart = {

        series: [{
            name: 'amount',
            // data: [5,4,8,7,4]
            data: data
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: categories
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },
    };


    var category = []
    const handleYear = async (months) => {
        pointers = months;
        var tempday = new Date();
        tempday.setMonth(tempday.getMonth() - months);
        for (var i = 1; i <= pointers; i++) {
            category.push(formatDate(tempday.setMonth(tempday.getMonth() + 1)));
            // console.log('tempday', tempday.getMonth())
        }
        // console.log(category);
        setCategories(category);
        const conf = {
            method: 'get',
            url: base_url + 'orders/sale',
            params: {
                start_day: category[0],
                duration: 12
            }
        };
        
        await axios(conf)
            .then((result) => {
                var data_temp = []
                for (var i = 0; i < category.length; i++) {
                    var date_flag = false;
                    for (var j = 0; j < result.data.length; j++) {
                        if (category[i] == result.data[j].day) {
                            date_flag = true;
                            data_temp.push(result.data[j].amount);
                            break;
                        }
                    }
                    if (!date_flag)
                        data_temp.push(0);
                }
                setData(data_temp);
            })
        category = [];

    }
    console.log("========>", data);
    const handleDate = async (date) => {

        const pointers = date;
        var tempday = new Date();
        tempday.setDate(tempday.getDate() - pointers);
        for (var i = 1; i <= pointers; i++) {
            category.push(formatDate(tempday.setDate(tempday.getDate() + 1)));
            // console.log('tempday', tempday.getMonth())
        }
        // console.log(category);
        const conf = {
            method: 'get',
            url: base_url + 'orders/sale',
            params: {
                start_day: category[0],
                duration: 7
            }
        };

        setCategories(category);
        // const amount  = await axios
        await axios(conf)
            .then((result) => {
                var data_temp = []
                for (var i = 0; i < category.length; i++) {
                    var date_flag = false;
                    for (var j = 0; j < result.data.length; j++) {
                        if (category[i] == result.data[j].day) {
                            date_flag = true;
                            data_temp.push(result.data[j].amount);
                            break;
                        }
                    }
                    if (!date_flag)
                        data_temp.push(0);
                }
                setData(data_temp);
            })
        category = [];
    }

    useEffect(() => {
        async function showGraph(){
            await handleDate(7);
        }
        showGraph();
    }, []);

    const createPDF = () => {
        html2canvas(document.querySelector("#chart")).then(canvas => {
            // document.body.appendChild(canvas);  // if you want see your screenshot in body.
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save("sale_export.pdf");
        });
    }

    return (
        <div className='bg-white'>
            <ProfileTitle className='border-bottom'><label className='m-2'>Sale Statistics</label> <ExportButton onClick={createPDF} className='m-2 py-1 px-2'>Export PDF</ExportButton></ProfileTitle>
            <div className='d-flex justify-content-end gap-3 m-2'>
                <DateButton onClick={() => handleYear(12)}>12 Months</DateButton>
                <DateButton onClick={() => handleYear(6)}>6 Months</DateButton>
                <DateButton onClick={() => handleDate(30)}>30 Days</DateButton>
                <DateButton onClick={() => handleDate(7)}>7 Days</DateButton>
            </div>
            <div id="chart">
                <Chart options={chart.options} series={chart.series} type="area" height={350} />
            </div>
        </div>
    )
}
export default SaleGraph;