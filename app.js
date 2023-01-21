import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SchoolDegrees from "./SchoolDegrees.json";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";


const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      margin: "10px",
    },
    select: {
      minWidth: "150px",
    },
    table: {
      minWidth: 650,
    },
  })
);

function App() {
  const classes = useStyles();
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [degreeToken, setDegreeToken] = useState(null);

  useEffect(() => {
    fetch('https://arb-goerli.g.alchemy.com/v2/wzo69fqo0ZyJ2SV0d14SnLdJh39J7iXj')
    .then(response => response.json())
    .then(data => {
        // do something with the data
    })
    .catch(error => {
        console.error('Error:', error);
    });
  },[]);



  const contract = useEffect(() => {
    if (web3 && network && SchoolDegrees.networks[network]) {
      return new web3.eth.Contract(
        SchoolDegrees.abi,
        SchoolDegrees.networks[network].address
      );
    }
    return null;
  }, [web3, network]);


  const handleMintSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const degree = form.elements["degree"].value;
    const school = form.elements["school"].value;
    const year = form.elements["year"].value;
    await contract.methods.mint(degree, school, year).send({ from: account });
  }

  return (
    <div>
    <form onSubmit={handleMintSubmit}>
        <FormControl className={classes.formControl}>
          <InputLabel id="degree-label">Degree</InputLabel>
          <Select
            labelId="degree-label"
            id="degree"
            name="degree"
            className={classes.select}
          >
            <MenuItem value="Bachelors">Bachelors</MenuItem>
            <MenuItem value="Masters">Masters</MenuItem>
            <MenuItem value="Doctorate">Doctorate</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="school-label">School</InputLabel>
          <Select
            labelId="school-label"
            id="school"
            name="school"
            className={classes.select}
          >
            <MenuItem value="University of California, Berkeley">University of California, Berkeley</MenuItem>
            <MenuItem value="Stanford University">Stanford University</MenuItem>
            <MenuItem value="Massachusetts Institute of Technology">Massachusetts Institute of Technology</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="year-label">Year</InputLabel>
          <Select
            labelId="year-label"
            id="year"
            name="year"
            className={classes.select}
          >
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
          </Select>
        </FormControl>
        <button type="submit">Mint Degree</button>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Degree</TableCell>
              <TableCell>School</TableCell>
              <TableCell>Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{degreeToken ? degreeToken.degree : "Loading..."}</TableCell>
              <TableCell>{degreeToken ? degreeToken.school : "Loading..."}</TableCell>
              <TableCell>{degreeToken ? degreeToken.year : "Loading..."}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default App;












//Version 2


import React, { useState, useEffect } from "react";
import Web3 from "web3";
how 

function App() {
  const API_KEY = 'https://arb-goerli.g.alchemy.com/v2/wzo69fqo0ZyJ2SV0d14SnLdJh39J7iXj';
  const web3 = new Web3(new Web3.providers.HttpProvider(API_KEY));
  const networkId = await web3.eth.net.getId();
  const contractAddress = abi.networks[networkId].address;
  const contract = new web3.eth.Contract(abi.abi, contractAddress);  

  useEffect(() => {
    if (window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    } else if (window.web3) {
      setWeb3(new Web3(window.web3.currentProvider));
    } else {
      // Connect to the provider
      const web3 = new Web3(API_KEY);
      setWeb3(web3);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const contract = await generateABI("./contracts/SoulBound_Token.sol");
        console.log(contract);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);


  const handleMintSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const degree = form.elements["degree"].value;
    const school = form.elements["school"].value;
    const year = form.elements["year"].value;
    await contract.methods.mint(degree, school, year).send({ from: account });
  }

}

export default App;



