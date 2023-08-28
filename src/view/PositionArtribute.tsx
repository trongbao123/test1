import { Box, Card, FormControl } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { CardHeader } from "@material-ui/core"
import { TextField, Checkbox, InputLabel } from "@material-ui/core"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useMatrixCellById } from "../hook/matrix"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

interface matrixByidProps {
  selectedMatrixCellId: any;
}
const PositionArtribute: React.FC<matrixByidProps> = ({ selectedMatrixCellId }) => {
  const maxtrixCellByid = useMatrixCellById(selectedMatrixCellId);
  const schema = yup.object().shape({
    label: yup.string().required("nhãn bắt buộc!"),
    attribute: yup.string().required("Giá trị  bắt buộc!"),
  })

  const {
    control,
    setValue,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  const handleValue = () => {
    setValue("label", maxtrixCellByid?.data?.data?.data?.label ? maxtrixCellByid?.data?.data?.data?.label : "");
    setValue("attribute", maxtrixCellByid?.data?.data?.data?.attribute ? maxtrixCellByid?.data?.data?.data?.attribute : "");
  }

  useEffect(() => {
    handleValue();
  }, [maxtrixCellByid]);

  return (
    <Box>
      <Card>
        <CardHeader title={`Thuộc tính của vị trí  x:${maxtrixCellByid?.data?.data?.data?.row_number ? maxtrixCellByid?.data?.data?.data?.row_number : 0}, y :${maxtrixCellByid?.data?.data?.data?.column_number ? maxtrixCellByid?.data?.data?.data?.column_number : 0} `}></CardHeader>
      </Card>
      <Box sx={{ marginTop: 5 }}>
        <FormControl fullWidth>
          <Controller name="label" control={control} rules={{ required: true }} render={({ field: { value, onChange } }) => <TextField autoFocus className="input-desc" id="outlined-basic" label={"Nhãn Vị Trí"} variant="outlined" value={value ? value : ""} onChange={onChange} />} />
        </FormControl>
        <FormControl fullWidth className="mt-3">
          <Controller name="attribute" control={control} rules={{ required: true }} render={({ field: { value, onChange } }) => <TextField autoFocus className="input-desc" id="outlined-basic" label={"Giá Trị"} variant="outlined" value={value ? value : ""} onChange={onChange} />} />
        </FormControl>
        <FormControl fullWidth className="mt-3">
          <TextField autoFocus className="input-desc" id="outlined-basic" label={"Ghi Chú"} variant="outlined" />
        </FormControl>
      </Box>
    </Box>
  )
}

export default PositionArtribute
