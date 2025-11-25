const fs = require("fs")

const read_file = (file_name) => {
    return JSON.parse(fs.readFileSync('./data/${rfile_name}', "utf-8"))
}


const fs = require("fs")

const write_file = (file_name) => {
    return JSON.parse(fs.writeFileSync('./data/${rfile_name}', JSON.stringify(data, null , 4)))
}

module.exports = {
    read_file,
    write_file
}