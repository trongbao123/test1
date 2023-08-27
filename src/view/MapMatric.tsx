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
  console.log(selectedMatrixId, "selec")
  useEffect(() => { }, [])

  const renderMatrixCells = () => {
    return matrix?.data?.data?.map((item: any, index: any) => {
      console.log(item, "iteeee");
      const matrixCellData = matrixCell?.data?.data?.data

      const filteredCells = matrixCellData?.filter((cell: any) => cell?.matrix_id === item?.id)
      console.log(filteredCells, "đasa")
      const rows = item?.row
      const columns = item?.columns

      const matrixData: any[] = []

      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {

          const cell = filteredCells?.find((c: any, index: number) => {
            console.log(i, "hàng");
            console.log(j, "cột");
            console.log(c?.row_index, "hanghf so sánh");
            console.log(c?.column_index, "cột so sánh");
            console.log(index, "vị trí tp");
            console.log(i * rows, "vị trí  hàng");
            console.log(i * columns, "vị trí  cột");
            console.log(index === i * columns + j && c?.row_index === i * rows && c?.column_index === j * columns, "điều kiện");
            return index === i * columns + j;
          });
          console.log(cell, "cell2");
          row.push(cell?.label || 0);
        }
        matrixData.push(row);
        console.log(matrixData, "matrs");
      }


      console.log(matrixData, "matrixData");

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
              console.log(row, 'row render');
              const i = filteredCells?.find((ite: any) => ite?.matrix_id === selectedMatrixId)

              return i?.matrix_id === selectedMatrixId ? (
                <tr key={rowIndex}>
                  {row?.map((cellValue: any, cellIndex: any) => {
                    console.log(cellValue, 'cellvalue');
                    console.log(filteredCells?.[rowIndex * rows + cellIndex]?.id, "wtf");
                    console.log(selectedMatrixCellId, 'id ddđ');
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
