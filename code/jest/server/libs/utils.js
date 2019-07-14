const fs = require('fs')

export default {
    saveFile(file, uploadFilePath, staticPath) {
        return new Promise((resolve, reject) => {
            fs.readFile( file.path, (err, data) => {
                fs.writeFile(uploadFilePath, data, (err) => {
                    if( err ){
                        reject([err, false, err.message, 0])
                        this.send()
                    }else{
                        resolve([{
                            message:'File uploaded successfully', 
                            filename:file.name,
                            filePath: staticPath
                        }, true, '成功', 1])
                    }
                });
            });
        })
    }
}