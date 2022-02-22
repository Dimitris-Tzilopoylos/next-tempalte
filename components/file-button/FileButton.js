import React from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function FileButton(props) {

    const onInput = (e) => {
        try {
            const files = props?.multiple ? e.target.files : e.target.files[0]
            if(!files) throw {error:'nothing to uplaod'}
            if(!props.onFileInput || !(props.onFileInput instanceof Function)) throw {error:'no handler provided for uplaod'}
            e.target.value = null
            if(props.multiple && props.maxFiles) {
                if(e.target.files?.length > props.maxFiles) throw {error:`Maximum number of uploaded files is ${props.maxFiles}`}
            }
            if(props.maxFilesSize) {
                const _files = props.multiple ? [...files] : [files]
                let total_size = 0 
                let size = parseFloat(props.maxFilesSize) * 1024*1024 
                console.log(_files)
                for(let file of _files) {
                    total_size += file.size 
                    if(total_size > size) throw {error:`Maximum upload size is ${props.maxFilesSize}MB`}
                }
                console.log(total_size)
            }
            props.onFileInput(e,files,null)
        } catch (error) {
            if(props.onFileInput instanceof Function) props.onFileInput(e,null,error.error)
        }
    }


    return (
    <label htmlFor={props.id ?? "icon-button-file"}>
        <input style={{display:'none'}} accept={props.accept ?? "image/*"} id={props.id ?? "icon-button-file"} type="file" onInput={onInput} multiple={props.multiple} />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
  )
}
