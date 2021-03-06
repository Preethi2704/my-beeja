import React, { Component, Fragment, useState } from 'react'

import Styled from '@emotion/styled';
import { Link, useParams } from 'react-router-dom';
import { useMutation, gql, useQuery } from '@apollo/client';
import { ListOfEmployee } from './ListOfEmployee';
import { graphql } from 'graphql';

const Navbar = Styled.nav`
background-color: ${(props) => props.bgColor};
position: sticky;
top:0px;
padding:8px;
color:${(props) => props.color};
font-size:25px;
`;
const Logo = Styled.img`
height:20px;
width:20px
`;
const Lable = Styled.label`
font-size:20px;
`;
const Input = Styled.input`
border-radius:5px;
width:230px;
margin-left:5px;
height:25px;
`;
const Break = Styled.br`
`;
const SelectBox = Styled.select`
&.Selectbox1{
width: 230px;
margin-left:5px;
border-radius:5px;
height:25px;
}
`;
const Option = Styled.option`
`;
const Button = Styled.button`
color:black;
background-color: ${props =>
        props.save ? 'powderblue' : 'white'};
height:30px;
font-size:20px;
width:80px;
border-radius:5px;
&:hover {
opacity:0.5;
`;
const Container = Styled.form`
display: flex;
justify-content: center;
align-items: center;
padding:20px;
`;
const Table = Styled.table`
`;
const TableData = Styled.td`
`;
const TableRow = Styled.tr`
`;
const TableColumn = Styled.td`
`;
const LinkTag = Styled(Link)` 
color:black; 
text-decoration:none;
`;


export const EditEmployee = () => {

    const { id } = useParams();


    const [empState, setState] = useState({
        username: "",
        code: "",
        email: " ",
        mobileNo: "",
        department: "",
        role: "",
        joinedDate: ""
    })

    const GetEmployeeById = gql`
    query EmpDetails($id:String!){
        employee(id:$id){
            name
            code
            email
            mobileNo
            department
            role
            joinedDate
        }
    }
    `;

    const EmployeeEdit = gql`
     mutation UpdateEmployee($id: String!){
         updateEmployee(id:$id,data: {
              name:"${empState.username}",
              code:"${empState.code}",
              email:"${empState.email}",
              mobileNo:"${empState.mobileNo}",
              department:"${empState.department}",
              role:"${empState.role}",
             joinedDate:"${empState.joinedDate}"   
           })
           {
              respCode, respMessage
                  }
              }
          `;
    const { loading, error, data } = useQuery(GetEmployeeById, { variables: { id: id } });

    const [EditMutation,] = useMutation(EmployeeEdit);
    if (loading) return <p>Loading....</p>
    if (error) return <p>ERROR....</p>

    const handleChange = (e) => {
        setState({
            ...empState,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(empState);
        EditMutation({ variables: { id: id } });

    };

    return (
        <Fragment>

            <Navbar bgColor="grey" color="white">
                Edit an Employee
                        </Navbar>
            <Break />
            <Container >

                <Table >

                    <TableRow>

                        <TableColumn ><Lable htmlFor="Name"> Name:</Lable></TableColumn>
                        <TableColumn ><Input type="text" name="username" defaultValue={data.employee.name} onChange={handleChange} required /></TableColumn>

                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn ><Lable htmlFor="Empl-Id"> Employee Id: </Lable></TableColumn>
                        <TableColumn><Input type="text" name="code" defaultValue={data.employee.code} onChange={handleChange} required /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn ><Lable htmlFor="Email"> Email: </Lable></TableColumn>
                        <TableColumn><Input type="email" name="email" defaultValue={data.employee.email} onChange={handleChange} required /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn > <Lable htmlFor="Mobile Number"> Mobile Number: </Lable></TableColumn>
                        <TableColumn><Input placeholder=" +91 " name="mobileNo" defaultValue={data.employee.mobileNo} onChange={handleChange} type="number" required /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn > <Lable htmlFor="Department"> Department: </Lable></TableColumn>
                        <TableColumn><SelectBox className="Selectbox1" name="department" defaultValue={data.employee.department} onChange={handleChange} required>
                            <Option disabled selected value> Select an Option</Option>
                            <Option value="HR"> HR </Option>
                            <Option value="ADMIN"> ADMIN </Option>
                            <Option value="ACCOUNTING"> ACCOUNTING </Option>
                            <Option value="IT"> IT </Option>
                        </SelectBox></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn ><Lable htmlFor="Role"> Role: </Lable></TableColumn>
                        <TableColumn><SelectBox className="Selectbox1" name="role" defaultValue={data.employee.role} onChange={handleChange} required>
                            <Option disabled selected value> Select an Option</Option>
                            <Option value="ADMIN"> ADMIN </Option>
                            <Option value="SUPER ADMIN"> SUPER ADMIN </Option>
                            <Option value="ACCOUNTANT"> ACCOUNTANT </Option>
                            <Option value="SOFTWARE ENGINEER"> SOFTWARE ENGINEER </Option>
                            <Option value="SENIOR-SOFTWARE ENGINEER"> SENIOR-SOFTWARE ENGINEER </Option>
                        </SelectBox></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn > <Lable htmlFor="Date-Containerat" className="Selectbox1"> Join Date: </Lable></TableColumn>
                        <TableColumn> <Input type="date" placeholder="dd-mm-yyyy" name="joinedDate" defaultValue={data.employee.joinedDate} onChange={handleChange} required /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn ><Button type="Cancel">
                            <LinkTag to={"/list"}>Cancel</LinkTag>
                        </Button></TableColumn>


                        <TableColumn><Button onClick={handleSubmit}>
                            <LinkTag to={"/list"}>
                                Submit
                        </LinkTag>
                        </Button></TableColumn>

                    </TableRow>

                </Table>

            </Container>

        </Fragment>
    );
}
