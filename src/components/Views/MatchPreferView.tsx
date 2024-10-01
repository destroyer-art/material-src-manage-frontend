import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Container,
  Button,
} from "@mui/material";
import { Inventory, Preference } from "../../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../consts";

interface MatchViewProps {
  prefers: Preference[];
}

export const MatchPreferView: React.FC<MatchViewProps> = ({ prefers }) => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const getMatchData = async (prefer: Preference) => {
    const response = await axios.post(
      "http://localhost:4000/inventory/match",
      prefer
    );
    const data: Inventory[] = response.data;
    return data;
  };

  useEffect(() => {
    getMatchData(prefers[selectedIndex]).then((data) => setInventory(data));
  }, [page, rowsPerPage, selectedIndex]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDropdownChange = (event: SelectChangeEvent<number>) => {
    setSelectedIndex(parseInt(event.target.value as string));
  };

  const handleGoBack = () => {
    navigate(PATH.DASHBOARD);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: 2 }}
      >
        <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
          <InputLabel id="dropdown-label">Preference</InputLabel>
          <Select
            labelId="dropdown-label"
            value={selectedIndex}
            label="Select Option"
            onChange={handleDropdownChange}
          >
            {prefers.map((_, index) => (
              <MenuItem key={index} value={index}>
                {`Preference ${index + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          component="label"
          sx={{ marginRight: 2 }}
          onClick={handleGoBack}
        >
          Back to Dashboard
        </Button>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="data table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Product Number</TableCell>
                <TableCell>Form</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Finish</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Dimensions</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((ivntry, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={ivntry.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{ivntry.product_number}</TableCell>
                  <TableCell>{`${ivntry.form} ${ivntry.choice}`}</TableCell>
                  <TableCell>{`${ivntry.grade} ${ivntry.surface}`}</TableCell>
                  <TableCell>{ivntry.finish}</TableCell>
                  <TableCell>{ivntry.quantity}</TableCell>
                  <TableCell>{`L=${ivntry.length} W=${ivntry.width} H=${ivntry.height} T=${ivntry.thickness} OD=${ivntry.outer_diameter} Wt=${ivntry.wall_thickness} Tw=${ivntry.web_thickness} Tf=${ivntry.flange_thickness}`}</TableCell>
                  <TableCell>{ivntry.weight}</TableCell>
                  <TableCell>{ivntry.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={inventory.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};
