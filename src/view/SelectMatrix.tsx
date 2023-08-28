import React, { useEffect } from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

interface Props {
  propMatric: any
  setSelectedMatrixId: any
  selectedMatrixId: any
}

const SelectMatrix: React.FC<Props> = ({ propMatric, selectedMatrixId, setSelectedMatrixId }) => {

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedMatrixId(event.target.value as string)
  }

  const selectedMatric = () => {
    return propMatric?.data?.data?.map((matric: any, index: any) => {
      return (
        <MenuItem key={index} value={matric.id}>
          {matric.name}
        </MenuItem>
      )
    })
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl style={{ width: "80%" }}>
        <InputLabel id="demo-simple-select-label">Chọn Ma Trận</InputLabel>
        <Select style={{ width: "100%" }} labelId="demo-simple-select-label" id="demo-simple-select" value={selectedMatrixId} label="Age" onChange={handleChange}>
          {selectedMatric()}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectMatrix
