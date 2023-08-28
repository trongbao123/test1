import React, { useEffect } from "react"
import { Button, Card, CardHeader } from "@mui/material"

interface propMatrixCell {
  matrixCell: any
  selectedMatrixCellId: any
  setSelectedMatrixCellId: any
  selectedMatrixId: any
  matrix: any
}

const MapMatric: React.FC<propMatrixCell> = ({ matrix, selectedMatrixId, matrixCell, selectedMatrixCellId, setSelectedMatrixCellId }) => {

  const renderMatrixCells = () => {
    return matrix?.data?.data?.map((item: any, index: any) => {
      const matrixCellData = matrixCell?.data?.data?.data
      const filteredCells = matrixCellData?.filter((cell: any) => cell?.matrix_id === item?.id)
      const rows = item?.row
      const columns = item?.columns

      const matrixData: any[] = []

      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {

          const cell = filteredCells?.find((c: any, index: number) => {
            return index === i * columns + j;
          });
          row.push(cell?.label || 0);
        }
        matrixData.push(row);
      }

      const buttonStyle = {
        border: "solid 1px aqua",
        borderRadius: 5,
        padding: 30,
        height: 40,
        paddingLeft: 30,
        lineHeight: "5px",
        margin: 40,
        cursor: "pointer",
        backgroundColor: "aqua"
      }

      return (
        <div key={index}>
          <tbody>
            {matrixData?.map((row: any, rowIndex: any) => {
              const i = filteredCells?.find((ite: any) => ite?.matrix_id === selectedMatrixId)
              return i?.matrix_id === selectedMatrixId ? (
                <tr key={rowIndex}>
                  {row?.map((cellValue: any, cellIndex: any) => {
                    return (
                      <td key={cellIndex}>
                        <Button
                          style={buttonStyle}
                          className="col-3"
                          onClick={() => {
                            setSelectedMatrixCellId(filteredCells?.[rowIndex * rows + cellIndex]?.id)
                          }}
                        >
                          {cellValue}
                        </Button>
                      </td>
                    )
                  })}
                </tr>
              ) : null
            })}
            {rows - matrixData.length > 0 &&
              Array(rows - matrixData.length)
                .fill(null)
                .map((_, emptyRowIndex) => (
                  <tr key={`empty-row-${emptyRowIndex}`}>
                    {Array(columns)
                      .fill(null)
                      .map((_, emptyCellIndex) => (
                        <td key={`empty-${emptyCellIndex}`}></td>
                      ))}
                  </tr>))
            }
          </tbody>
        </div>
      )
    })
  }

  return (
    <div>
      <Card>
        <CardHeader title="Sơ đồ ma trận"></CardHeader>
      </Card>
      <Card style={{ marginTop: 20 }}>
        <div className="container">{renderMatrixCells()}</div>
      </Card>
    </div>
  )
}

export default MapMatric
