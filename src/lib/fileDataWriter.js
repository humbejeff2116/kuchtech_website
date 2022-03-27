const fs = require('fs');
const fsPromise = require("fs").promises;
const path = require('path');

function FileDataWriter() {

    this.setRelativePath = setRelativeFilePath;

    this._relativeFilepath = null;

    this._fileExists = false;

}
  
 function setRelativeFilePath(relativeFilepath = "", fileName = "") {

    if (!fs.existsSync(relativeFilepath)) {
        
        fs.mkdirSync(relativeFilepath);

        this._relativeFilepath = path.join(relativeFilepath, fileName);

    } else {

        this._relativeFilepath = path.join(relativeFilepath, fileName);

    }

    if (fs.existsSync(path.join(relativeFilepath, fileName))) {

        this._fileExists = true;

    }
    return this;
}
  
  
FileDataWriter.prototype.writeDataToFile = function (source = {}) {

    if (this._fileExists) {

        fs.readFile(this._relativeFilepath , "utf-8", async (err, data) => {

            if (err) console.error(err)

            const updatedData = await this._updateData(data, source);

            this._saveDataAsJSON(updatedData, this._relativeFilepath);
        });

        return 
    }

    this._saveDataAsJSON([source], this._relativeFilepath);
}
  
  
FileDataWriter.prototype._updateData =  function(data = [], source = {}) {

    const blogPosts = JSON.parse(data);

    blogPosts.push(source);

    return blogPosts;
}
  
FileDataWriter.prototype._saveDataAsJSON = function (data = [], filepath = "") {

    fs.writeFile(filepath, JSON.stringify(data, null, 2), err => {

        if (err) throw err; 

        console.log("data added successfully");
    });
}

FileDataWriter.prototype.getAllData = async function() {

    let response;

    if (!this._fileExists) {

        response = {
            status: 400,
            data: [],
            message: "no data found"
        }
        return response;

    }

    try {

        const blogPosts = await fsPromise.readFile(this._relativeFilepath , "utf-8");

        response = {
            status: 200,
            data: [...JSON.parse(blogPosts)],
            message: "data gotten successfully"
        }

        return response;

    } catch (err) {

        console.error(err)
        response = {
            status: 400,
            data: [],
            message: "an error occured while getting data"
        }
        return response;

    }  
}

FileDataWriter.prototype.search = async function(query = "") {

    let response;
    const queryString = query.trim().toLowerCase().split(" ");
    const searchedData = [];


    if (!this._fileExists) {

        response = {
            status: 400,
            data: [],
            message: "no data found"
        }
        return response;

    }

    try {

        const retrievedFileData = await fsPromise.readFile(this._relativeFilepath , "utf-8");
        const parsedRetrievedData = JSON.parse(retrievedFileData);

        for (let i = 0; i < parsedRetrievedData.length; i++ ) {

            for(let j = 0; j < queryString.length; j++) {

                if (parsedRetrievedData[i].title.trim().toLowerCase().split(" ").includes(queryString[j])) {

                    filterDuplicate(parsedRetrievedData[i], searchedData) 

                }

            }

        }

        function filterDuplicate(data = {}, searchedData = []) {

            const  uniqueDataContainsElem =  !!searchedData.find(uniqueDataItem => {

                return uniqueDataItem.title === data.title

            })

            if (!uniqueDataContainsElem) {

                searchedData.push(data)

            }

        }

        response = {
            status: 200,
            data: searchedData,
            message: "data gotten successfully"
        }

        return response;

    } catch (err) {

        console.error(err)
        response = {
            status: 400,
            data: [],
            message: "an error occured while getting data"
        }
        return response;

    }  
}

module.exports = FileDataWriter;


// function removeDuplicate(searchedData = [] ) {

//     const uniqueData  = [];

//     searchedData.forEach(searchedDataItem => {

//         const  uniqueDataContainsElem =  !!uniqueData.find(uniqueDataItem => {

//             return uniqueDataItem.title === searchedDataItem.title

//         })

//         if (!uniqueDataContainsElem) {

//             uniqueData.push(searchedDataItem)

//         }
//     })
//     return uniqueData;

// }