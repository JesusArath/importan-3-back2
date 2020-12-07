import express from "express";
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

var bodyParser = require('body-parser');// instalar: npm install body-parser
var cors = require('cors')


const app = express();
const port = 3000;

app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(bodyParser.json()); // body en formato json
app.use(bodyParser.urlencoded({ extended: false })); //body formulario

app.listen(port, () =>{
    console.log("Aplicación escuchandose en puerto: ", process.env.PORT);
});

app.post('/', (req,res) => {

    const lel = req.body
    const datos = lel.prima
    const resultado = `${datos}.00 pesos`

    
    const fs = require('fs');
    
    const fetch = require("node-fetch");

    async function modifyPdf() {
    const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    // const existingPdfBytes = await fetch(url).then((res: any) => res.arrayBuffer())
    const existingPdfBytes = fs.readFileSync('./importan-plantilla.pdf');

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    console.log(width)
    firstPage.drawText(resultado, {
        x: 190,
        y: 180,
        size: 20,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
    })

    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync('./importan-3.pdf', pdfBytes);
    var path = require('path');
    res.sendFile(path.join(__dirname, '../', 'importan-3.pdf'))
    }
    
    modifyPdf()
})