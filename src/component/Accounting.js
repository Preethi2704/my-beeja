import { React, Fragment, useState } from "react";
import Styled from '@emotion/styled';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useQuery, gql, useMutation } from '@apollo/client';


const Navbar = Styled.nav`
background-color: ${(props) => props.bgColor};
position: sticky;
top: 0px;
padding: 8px;
color: ${(props) => props.color};
font-size: 20px;
`;
const Logo = Styled.img`
height: 30px;
width: 30px;
margin-bottom: -5px;
`;
const Break = Styled.br`
`;
const Button = Styled.button`
color:black;
background-color: powderblue;
height:27px;
margin-top: -3px;
font-size: 13px;
outline: none;
border: none;
width: 100px;
float: right;
border-radius: 5px;
&:hover {
opacity: 0.5;
`;
const Container = Styled.form`
display: flex;
justify-content: center;
align-items: center;
padding: 8px;
`;
const Table = Styled.table`
border-collapse: collapse;
border: 1px solid #ddd;
width: 100%;
padding: 20px;
`;
const TableRow = Styled.tr`
border: 1px solid #ddd;
&:nth-child(even){background-color: #F2F2F2;}
&:hover {background-color: #ddd;}
`;
const TableData = Styled.td`
border: 1px solid #ddd;
height: 30px;
vertical-align: bottom;
// text-align:left;
`;
const TableHeading = Styled.th`
border: 1px solid #ddd;
height: 10px;
padding:8px;
text-align:left;
`;
const LinkTag = Styled(Link)`
color:black;
text-decoration:none;
`;
const Hover = Styled.a`
&:hover {
    color:blue;
`;
export const SystemDetails = () => {
    const { id } = useParams();
    const [empId, setEmpId] = useState({ 'idToDelete': "" });
    const ShowSD = gql`
   query{ 
    systemdetailsList{
        id
        name
        code
        device
        config
        slno_scode_regno
        devicehistory
    }
 }`;
    const DELETE_SD = gql`
 mutation DeleteSD($id: String!){
    deleteSystemDetails(id: $id){
 respCode,
 respMessage 
}
}
`;

    const { loading, error, data } = useQuery(ShowSD);
    const [deleteMutation] = useMutation(DELETE_SD);
    const handleDelete = (deleteId) => {
        if (window.confirm("Are you sure?")) {
            setEmpId({ 'idToDelete': deleteId });
            console.log("handleDelte", deleteId, empId);
            deleteMutation({ variables: { id: deleteId } });

        }
        else {

        }
    };


    console.log(data);
    if (loading) return <p>loading</p>;
    if (error) return <p>Error</p>;

    return (
        <Fragment>
            <Navbar bgColor="grey" color="white">System Details
<Button >
                    <LinkTag to={"/createsystem"}>
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>    ADD
                        </LinkTag>
                </Button>
            </Navbar>
            <Break />
            <Container>
                <Table>
                    <TableRow>
                        <TableHeading>ID</TableHeading>
                        <TableHeading>Name</TableHeading>
                        <TableHeading>Device</TableHeading>
                        <TableHeading>Config</TableHeading>
                        <TableHeading>SL.No/S.Code/Reg.No</TableHeading>
                        <TableHeading>DeviceHistory</TableHeading>
                        <TableHeading>Edit</TableHeading>
                        <TableHeading>Delete</TableHeading>
                    </TableRow>
                    {data.systemdetailsList.map((sys, id) => (
                        <TableRow>
                            <a href="">
                                <LinkTag to={`/sd/${sys.id}`}>
                                    <Hover>
                                        <TableData key={id}>{sys.code}</TableData>
                                    </Hover>
                                </LinkTag>
                            </a>
                            <TableData>{sys.name}</TableData>
                            <TableData>{sys.device}</TableData>
                            <TableData>{sys.config}</TableData>
                            <TableData>{sys.slno_scode_regno}</TableData>
                            <TableData>{sys.devicehistory}</TableData>
                            <TableData style={{ "text-align": "center" }} >
                                <LinkTag to={`/editsystem/${sys.id}`}>
                                    <FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon>
                                </LinkTag>
                            </TableData>
                            <TableData style={{ "text-align": "center" }} >
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(sys.id)}></FontAwesomeIcon>
                            </TableData>

                        </TableRow>
                    ))
                    }
                </Table>
            </Container>

        </Fragment>

    )
}