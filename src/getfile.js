/**
 * 
 * This module is used to get the file you wish to download
 * 
 */


const https = require("https");
const http = require("http");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path")
const extract = require("extract-zip");

 const getfile = {};

//  Temporary folder
getfile.tmpFolder = path.join(__dirname, "../tmp/");

// Generate random name
getfile.generateRandomName = (ext) => {
    return crypto.randomBytes(10).toString('hex')+`.${ext}`;
}
 
// This method downloads the file
/**
 * @param(string) url - the url to download the zip file from
 * @param(string) dir - the directly to save the file
 * @param(boolean) - specifies whether to unzip the file or not
 */
getfile.downloadZip = (url, dir, unzip) => {

    // Generate the random to save the file with
    let zippedFilename = getfile.generateRandomName("zip");

    // Create a writeable stream to send the file to
    let zippedWritable = fs.createWriteStream(zippedFilename);

    // Parse the URL to get the protocol
    let parsedUrl = url.split("/");

    // Get the protocol and select whether http or https module accordingly
    let protocol = parsedUrl[0] == "https:" ? https : http;
  
    protocol.get(url, resp => {
        // Save the file using pipe method of the response
        let stream = resp.pipe(zippedWritable);

        // Check if file has been save successfully  
        stream.on("finish", () => {
            // The location to move the downloaded zip file
            let newLocation = getfile.tmpFolder+zippedFilename;

            // Use the rename function to move the file to the newLocation
            fs.rename(zippedFilename, newLocation, (err) => {
                if(!err) {
                    console.log("Moved to tmp");
                    if(unzip) {
                        // If unzip is true then unzip the file
                        getfile.extractFile(newLocation, path.parse(newLocation).name, dir)
                    }
                } else {
                    console.log(err)
                }
            })
        })
    })
    
    
}

getfile.extractFile = (file, dir, internalDir) => {
    // Use the user specified directory or return to the default
    internalDir = internalDir ? internalDir : "extractedfiles";

    console.log("Extracting files")
    // Extract the file
    extract(
      file,
      { dir: path.join(__dirname, `../${internalDir}/`+dir) },
      function(err) {
        if (!err) {
            // Extraction is complete to the supplied dir, then delete the file from the tmp folder
            fs.unlink(file, (err) => {
                if(!err) {
                console.log("File extracted completely");
                }
            })
        } else {
          console.log(err);
        }
      }
    );
}


module.exports =  getfile;