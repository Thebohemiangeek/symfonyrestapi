import React, { useState } from 'react'
import axios from "axios";
import styled from 'styled-components'
import { useForm, Controller } from "react-hook-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Form = ({ setUpdate, update }) => {
    const { register, errors, handleSubmit, control } = useForm();
    const APIPOST = 'http://127.0.0.1:8000/api/employee';
    const onSubmit = async data => {
        axios.post(APIPOST, data);
        setUpdate(!update)

    }
    console.log(update);

    return (
        <Container>
            <h1>Employees</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="star">
                    <label htmlFor="firstname">First Name :</label>

                    <input name="firstname" className="box" ref={register({ required: "Required", pattern: { message: "First Name is required" } })} />
                    {errors.firstname && <span>You need to write your name.</span>}
                </div>
                <div className="star">
                    <label htmlFor="lastname">Last Name :</label>
                    <input name="lastname" className="box" ref={register({ required: "Required", pattern: { message: "Last Name is required" } })} />
                    {errors.lastname && <span>You need to write your last name.</span>}
                </div>
                <div className="star" >
                    <label htmlFor="birthdate">Date of birth:</label>
                    <Controller
                        control={control}
                        name="birthdate"
                        render={({ onChange, onBlur, value }) => (
                            <DatePicker
                                onChange={onChange}
                                onBlur={onBlur}
                                placeholderText="DD/MM/YY"
                                dateFormat="dd/MM/yyyy"
                                selected={value}
                                autocomplete="bday"

                            />
                        )}
                    />
                </div>
                <div className="star">
                    <label htmlFor="email">Email address:</label>
                    <input
                        className="box"
                        name="email"
                        ref={register({
                            required: "Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })}
                    />
                    {errors.email && errors.email.message}
                </div>
                <input type="submit" className="orangeButton" value="SUBMIT" />
            </form>
        </Container>
    )
}

export default Form

const Container = styled.div`
margin: 2rem 20%;
display: flex;
align-items: center;
flex-direction: column;

 background-color:#def2f9;
    color:#123f7b;
    font-weight:bold;
 h1{
     text-align:center;
 }
 label, input {
    height:2.5rem;
    margin: 10px auto;

 }
 .box {
     width:360px;
 
    }
    label{
  display: block;
  float: left;
  width : 120px;    

}
.star{
    &:after { content:" *"; color: red; }
}

.orangeButton{
    width:120px;
    margin-left:120px;
    margin-top: 20px;
    background-color: #f15a25;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 5%;
    border: none;

}

`