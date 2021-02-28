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
border:none;
width:230px;
margin-left:5px;
height:20px;
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

export const System_Details = () => {
    const { id } = useParams();
    const [systemState, setState] = useState({
        name: "",
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
    const { loading, error, data } = useQuery(DisplaySD, { variables: { id: id } });

    if (loading) return <p>Loading....</p>
    if (error) return <p>ERROR....</p>
    if (data && data.system) {
        systemState.name = data.system.name;
        systemState.code = data.system.code;
        systemState.device = data.system.device;
        systemState.config = data.system.config;
        systemState.slno_scode_regno = data.system.slno_scode_regno;
        systemState.devicehistory = data.system.devicehistory;
    }

    return (
        <Fragment>

            <Navbar bgColor="grey" color="white">
                System Details
                        </Navbar>
            <Break />
            <Container >

                <Table >

                    <TableRow>

                        <TableColumn ><Lable htmlFor="name"> Name</Lable></TableColumn>
                        <TableColumn >:<Input value={systemState.name} readOnly /></TableColumn>

                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn ><Lable htmlFor="Empl-Id"> Employee Code </Lable></TableColumn>
                        <TableColumn>:<Input value={systemState.code} readOnly /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn ><Lable htmlFor="Device"> Device </Lable></TableColumn>
                        <TableColumn>:<Input value={systemState.device} readOnly /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn ><Lable htmlFor="Config"> Config</Lable></TableColumn>
                        <TableColumn>:<Input value={systemState.config} readOnly /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn ><Lable htmlFor="SL.No/S.Code/Reg.No"> SL.No/S.Code/Reg.No</Lable></TableColumn>
                        <TableColumn>:<Input value={systemState.slno_scode_regno} readOnly /></TableColumn>
                    </TableRow>
                    <Break />
                    <TableRow>
                        <TableColumn ><Lable htmlFor="Device History"> Device History</Lable></TableColumn>
                        <TableColumn>:<Input value={systemState.devicehistory} readOnly /></TableColumn>
                    </TableRow>
                    <Break />

                </Table>
            </Container>

        </Fragment>
    );
}
