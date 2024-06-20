const mammoth = require('mammoth');
const path = require('path');
const fs = require('fs');

// const docxToHtmlMiddleware = (req, res, next) => {
//     if (req.files && req.files.document && req.files.document[0]) {
//         const docPath = req.files.document[0].path;
//         mammoth.convertToHtml({ path: docPath })
//             .then(result => {
//                 // Attach the converted HTML to the request object
//                 req.docHtmlContent = result.value;
//                 next();
//             })
//             .catch(error => {
//                 console.error('Error converting .docx to HTML:', error);
//                 res.status(500).json({ message: 'Error processing document file' });
//             });
//     } else {
//         next(); // Proceed without conversion if no .docx file is present
//     }
// };

const docxToHtmlMiddleware = (req, res, next) => {
    if (req.files && req.files.document && req.files.document[0]) {
        const docPath = req.files.document[0].path;
        mammoth.convertToHtml({ path: docPath })
            .then(result => {
                const htmlFilename = `htmlOutput-${Date.now()}.html`;
                const htmlOutputPath = path.join(__dirname, '../html', htmlFilename);
                fs.writeFileSync(htmlOutputPath, result.value); // Save HTML to file
                req.docHtmlPath = htmlFilename; // Save only the filename in the request for later use
                next();
            })
            .catch(error => {
                console.error('Error converting .docx to HTML:', error);
                res.status(500).json({ message: 'Error processing document file' });
            });
    } else {
        next(); // Proceed without conversion if no .docx file is present
    }
};

module.exports = {
    docxToHtmlMiddleware
}