import React, { useEffect, useState } from "react"

import FormControl from "@mui/material/FormControl"
import SelectMatrix from "../view/SelectMatrix"
import MapMatric from "../view/MapMatric"
import PositionArtribute from "../view/PositionArtribute"
import { Button, Radio } from "@mui/material"
import { updateMatrixData, useMatrix, useMatrixCell, useMatrixCellById } from "../hook/matrix"
import { useForm, Controller } from "react-hook-form"
import { TextField, InputLabel, FormHelperText, } from "@material-ui/core"
import { matrix } from "../service/MatrixService"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMatrixById } from "../hook/matrix"




export default function Home() {
  const [selectedMatrixId, setSelectedMatrixId] = useState(null || 0);
  const [selectedMatrixCellId, setSelectedMatrixCellId] = useState(null || 0);

  const matrixData = useMatrix();
  const matrixCell = useMatrixCell();
  const maxtrixCellByid = useMatrixCellById(selectedMatrixCellId)
  const { data } = useMatrixById(selectedMatrixId);

  const schema = yup.object().shape({
    name: yup.string().required("Tên bắt buộc!"),
    row: yup.string().required("Hàng bắt buộc!"),
    columns: yup.string().required("Cột bắt buộc!"),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  })

  const handleValue = () => {
    setValue("name", data?.data?.data?.name ? data?.data?.data?.name : "");
    setValue("row", data?.data?.data?.row ? data?.data?.data?.row : "");
    setValue("columns", data?.data?.data?.columns ? data?.data?.data?.columns : "");
  }

  useEffect(() => {

    handleValue();
  }, [selectedMatrixId, data])

  const onSubmitForm = async (data: any) => {
    if (!selectedMatrixId) {
      await matrix.createMatrices(data);
    } else {
      await updateMatrixData(selectedMatrixId, data);
    }
  }




  return (
    <div className="container">
      <h1 className="mt-5" style={{ color: "#2185a0", fontWeight: 700 }}>
        Quản Lý Ma Trận
      </h1>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <FormControl fullWidth>
          <div className="row">
            <div className="col-4">
              <SelectMatrix propMatric={matrixData || {}} selectedMatrixId={selectedMatrixId} setSelectedMatrixId={setSelectedMatrixId} />
            </div>
            <FormControl className="col-8">
              <FormControl style={{ flexDirection: "row", width: "100%" }}>
                <InputLabel style={{ paddingTop: 20, color: "red" }}>Tên Ma Trận(*)</InputLabel>
                <Controller name="name" control={control} rules={{ required: true }} render={({ field: { value, onChange } }) => <TextField style={{ width: "81%", marginLeft: 12 }} autoFocus className="input-desc" id="outlined-basic" label={"name"} variant="outlined" value={value ? value : ""} onChange={onChange} error={Boolean(errors.name)} />} />
                {errors.name && <FormHelperText style={{ color: "red" }}>{errors.name.message}</FormHelperText>}
              </FormControl>
              <div className="mt-3" style={{ display: "flex", justifyContent: "space-between" }}>
                <FormControl style={{ flexDirection: "row", width: "100%" }}>
                  <InputLabel style={{ paddingTop: 20, color: "red" }}>Số cột(*)</InputLabel>
                  <Controller name="columns" control={control} rules={{ required: true }} render={({ field: { value, onChange } }) => <TextField style={{ width: "55%", marginLeft: 60 }} type="number" autoFocus className="input-desc" id="outlined-basic" label={"columns"} variant="outlined" value={value ? value : ""} onChange={onChange} error={Boolean(errors.columns)} />} />
                  {errors.columns && <FormHelperText style={{ color: "red" }}>{errors.columns.message}</FormHelperText>}
                </FormControl>
                <FormControl style={{ flexDirection: "row", width: "100%", marginLeft: 10 }}>
                  <InputLabel style={{ paddingTop: 20, textAlign: "start", color: "red" }}>Số Hàng (*)</InputLabel>
                  <Controller name="row" control={control} rules={{ required: true }} render={({ field: { value, onChange } }) => <TextField style={{ width: "55%", marginLeft: 60 }} type="number" autoFocus className="input-desc" id="outlined-basic" label={"rows"} variant="outlined" value={value ? value : ""} onChange={onChange} error={Boolean(errors.row)} />} />
                  {errors.row && <FormHelperText style={{ color: "red" }}>{errors.row.message}</FormHelperText>}
                </FormControl>
              </div>
              <FormControl style={{ flexDirection: "row", width: "100%" }} className="mt-3">
                <InputLabel style={{ paddingTop: 20 }}>Ghi Chú</InputLabel>
                <TextField style={{ width: "80%", marginLeft: 65 }} autoFocus className="input-desc" id="outlined-basic" label={""} variant="outlined" value={""} />
              </FormControl>
              <FormControl style={{ flexDirection: "row", width: "100%" }} className="mt-3">
                <Radio autoFocus className="input-desc" id="outlined-basic" />
                <InputLabel style={{ paddingTop: 12 }}>Trạng thái kích hoạt</InputLabel>
              </FormControl>
            </FormControl>
          </div>
          <div className="row">
            <div className="col-7">
              <MapMatric matrix={matrixData} selectedMatrixId={selectedMatrixId} matrixCell={matrixCell} selectedMatrixCellId={selectedMatrixCellId} setSelectedMatrixCellId={setSelectedMatrixCellId} />
            </div>
            <div className="col-5">
              <PositionArtribute selectedMatrixCellId={selectedMatrixCellId} />
            </div>
          </div>
          <Button style={{
            width: "50%",
            height: 50,
            backgroundColor: "#4be74b",
            color: "#FFFF",
            marginTop: 100,
            marginLeft: 300,
            marginBottom: 150
          }}
            onClick={handleSubmit(onSubmitForm)}>{!selectedMatrixId ? <div>Thêm</div> : <div>cập nhật</div>}</Button>
        </FormControl>
      </form>
    </div>
  )
}
