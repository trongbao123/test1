import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import SelectMatrix from "../view/SelectMatrix"
import InitialMatrix from "../view/InitialMatrix"
import MapMatric from "../view/MapMatric"
import PositionArtribute from "../view/PositionArtribute"
import { Button } from "@mui/material"
import { postMatrix, useMatrix, useMatrixCell } from "../hook/matrix"
import { useMutation } from "react-query"
import { updateMatric } from "../store/Matrix"

export default function Home() {
  const mutation = useMutation(postMatrix)
  const matrix = useMatrix()

  console.log(matrix, "th đủ r");
  const matrixCell = useMatrixCell()

  const [selectedMatrixId, setSelectedMatrixId] = useState(null)
  const [selectedMatrixCellId, setSelectedMatrixCellId] = useState(null)



  useEffect((

  ) => { }, [])



  return (
    <div className="container">
      <h1 className="mt-5" style={{ color: "#2185a0", fontWeight: 700 }}>
        Quản Lý Ma Trận
      </h1>
      <form>
        <FormControl fullWidth>
          <div className="row">
            <div className="col-4">
              <SelectMatrix propMatric={matrix || {}} selectedMatrixId={selectedMatrixId} setSelectedMatrixId={setSelectedMatrixId} />
            </div>
            <div className="col-8">
              <InitialMatrix selectedMatrixId={selectedMatrixId} />
            </div>
          </div>
          <div className="row">
            <div className="col-7">
              <MapMatric matrix={matrix} selectedMatrixId={selectedMatrixId} matrixCell={matrixCell} selectedMatrixCellId={selectedMatrixCellId} setSelectedMatrixCellId={setSelectedMatrixCellId} />
            </div>
            <div className="col-5">
              <PositionArtribute selectedMatrixCellId={selectedMatrixCellId} />
            </div>
          </div>

        </FormControl>
      </form>
    </div>
  )
}
