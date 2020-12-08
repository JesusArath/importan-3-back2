"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pdf_lib_1 = require("pdf-lib");
var bodyParser = require('body-parser'); // instalar: npm install body-parser
var cors = require('cors');
const app = express_1.default();
const port = 3000;
app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json()); // body en formato json
app.use(bodyParser.urlencoded({ extended: false })); //body formulario
app.listen(process.env.PORT, () => {
    console.log("Aplicación escuchandose en puerto: ", process.env.PORT);
});
app.get("/", (req, res) => {
    res.send("Hola Mundo");
});
app.post('/', (req, res) => {
    const lel = req.body;
    const datos = lel.prima;
    const resultado = `${datos} pesos`;
    const fs = require('fs');
    const fetch = require("node-fetch");
    function modifyPdf() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
            // const existingPdfBytes = await fetch(url).then((res: any) => res.arrayBuffer())
            const existingPdfBytes = fs.readFileSync('./importan-plantilla.pdf');
            const pdfDoc = yield pdf_lib_1.PDFDocument.load(existingPdfBytes);
            const helveticaFont = yield pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
            const { width, height } = firstPage.getSize();
            console.log(width);
            firstPage.drawText(resultado, {
                x: 190,
                y: 180,
                size: 20,
                font: helveticaFont,
                color: pdf_lib_1.rgb(0.95, 0.1, 0.1),
            });
            const pdfBytes = yield pdfDoc.save();
            fs.writeFileSync('./importan-3.pdf', pdfBytes);
            var path = require('path');
            res.sendFile(path.join(__dirname, '../importan-3.pdf'));
        });
    }
    modifyPdf();
});
