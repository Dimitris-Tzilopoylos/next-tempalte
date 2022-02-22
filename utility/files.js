export const convertFile = (file) => {
    return new Promise((resolve,reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve({file:reader.result,name:file.name,size:file.size,mimetype:file.type,extension:file.type.split('/').pop()})
        reader.onerror = error => reject(error);
    })
    
}