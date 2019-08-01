const getfile = require("./src/getfile")

// Using this is very simple
/**
 * the downloadZip accepts three arguments
 * the url, folder to save extracted file, and boolean to indicate where to extract or not
 */

// Example below downloads and extracts to a random generated named folder inside osmaxin

getfile.downloadZip("https://osmaxin.com/test.zip", "osmaxin", true);