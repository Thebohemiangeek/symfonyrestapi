import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from 'styled-components'

const List = () => {
    const API = 'http://localhost:8000/api/list'
    const [data, setData] = useState({ hits: [] });
    useEffect(async () => {
        const fetchData = async () => {
            const result = await axios(API);

            setData(result.data);
        };
        fetchData();
    }, []);
    const dataIterable = Array.from(data);
    const renderTable = () => {
        return dataIterable.map(user => {
            return (
                <tr key={user.id}>
                    <td className="capitalize">{user.firstname}</td>
                    <td className="capitalize">{user.lastname}</td>

                    <td>{user.birthdate}</td>
                    <td>{user.email}</td>

                </tr>
            )
        })
    }
    return (
        <Table>

            <thead>
                <tr>
                    <th>First Name:</th>
                    <th>Last Name:</th>
                    <th>Date of Birth:</th>
                    <th>Email adress:</th>
                </tr>
            </thead>
            <tbody>  {renderTable()}</tbody>
        </Table>
    )
}

export default List
const Table = styled.table`
border-collapse:collapse;
width:100%;
td{
padding-left:1rem;
}
th{
    padding-left:1rem;
 
}
tr{
    height:3rem;

}
thead{
text-align:left;
background-color: #123f7b;
color:#4aa6ca;
}
tbody{
    color:#123f7b;
    font-weight:bold;
    .capitalize{
        text-transform: capitalize;
    }
tr{
    &:nth-child(odd){
background-color:#def2f9;
}}
}

`