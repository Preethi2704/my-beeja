import React, { Component, Fragment, useState } from 'react'

import Styled from '@emotion/styled';
import { Link, useParams } from 'react-router-dom';
import { useMutation, gql, useQuery } from '@apollo/client';
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


export const EditSystem = () => {

    const { id } = useParams();


    const [empState, setState] = useState({
        username: "",
        code: "",
        device: "",
        config: " ",
        slno_scode_regno: "",
        devicehistory: "",
    })

    const DisplaySD = gql`
    query SystemSD($id:String!){
        system(id:$id){
            name
            code
            device
            config
            slno_scode_regno
            devicehistory
          }
    }
    `;
    const SystemEdit = gql`
     mutation UpdatSystemDetails($id: String!){
        updateSystemDetail(id:$id,data: {
              name:"${empState.username}",
              code:"${empState.code}",
              device:"${empState.device}",
              config:"${empState.config}",
              slno_scode_regno:"${empState.slno_scode_regno}",
              devicehistory:"${empState.devicehistory}",  
           })
           {
              respCode, respMessage
                  }
              }
          `;
    const { loading, error, data } = useQuery(DisplaySD, { variables: { id: id } });

    const [EditMutation] = useMutation(SystemEdit);
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
                Edit Details
                        </Navbar>
            <Break />
            <Container >

                <Table >

                    <TableRow>

                        <TableColumn ><Lable htmlFor="Name"> Name:</Lable></TableColumn>
                        <TableColumn ><Input type="text" name="username" defaultValue={data.system.name} onChange={handleChange} required /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn ><Lable htmlFor="Empl-Id"> Employee Id: </Lable></TableColumn>
                        <TableColumn><Input type="text" name="code" defaultValue={data.system.code} onChange={handleChange} required /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn ><Lable htmlFor="Device"> Device: </Lable></TableColumn>
                        <TableColumn><Input type="text" name="device" defaultValue={data.system.device} onChange={handleChange} required /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn > <Lable htmlFor="Config"> Config: </Lable></TableColumn>
                        <TableColumn><Input  name="config" defaultValue={data.system.config} onChange={handleChange} type="text" required /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn > <Lable htmlFor="Sl.No/S.Code/Reg.No">Sl.No/S.Code/Reg.No: </Lable></TableColumn>
                        <TableColumn> <Input type="text" name="slno_scode_regno" defaultValue={data.system.slno_scode_regno} onChange={handleChange} required /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                         <TableColumn ><Lable htmlFor="Device History"> Device History:</Lable></TableColumn>
                         <TableColumn ><Input type="text" name="devicehistory" defaultValue={data.system.devicehistory} onChange={handleChange} required /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn ><Button type="Cancel">
                            <LinkTag to={"/SystemDetails"}>Cancel</LinkTag>
                        </Button></TableColumn>
                       
                       
                        <TableColumn><Button onClick={handleSubmit}>
                            <LinkTag to={"/SystemDetails"}>
                                Submit
                        </LinkTag>
                        </Button></TableColumn>

                    </TableRow>

                </Table>

            </Container>

        </Fragment>
    );
}
