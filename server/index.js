var express = require('express');
const PDFDocument = require('pdfkit');
const { createWriteStream } = require('fs');
const bodyParser = require('body-parser');
const { statSync } = require("fs");
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/pdf', function (req, res, next) {
  const name = req.query.name;
  

  const doc = new PDFDocument({size:"A4"});

  doc.registerFont("hpfont","./assets/HARRYP__.TTF");
  doc.font("hpfont");
  doc.image("./assets/paperbg.jpg",0,0,{width:doc.page.width,height:doc.page.height});
  
  doc.image("./assets/hogwartslogo.png",222.64,10,{fit:[150,150],allign:"center",vallign:"center"});
  doc.fontSize(18);
  doc.text(`
  Dear ${name},

  It is with great pleasure and excitement that we extend our warmest congratulations to you! We are delighted to inform you that you have been accepted at Hogwarts School of Witchcraft and Wizardry for the upcoming academic year. This marks the beginning of a magical journey that will undoubtedly shape your future in the world of wizardry.

  Enclosed within this letter, you will find a comprehensive list of all the necessary books and equipment you will require for your studies at Hogwarts. The magical realm awaits, and we want to ensure that you are fully prepared to embark on this extraordinary adventure.`,35,200,{width:500,align:"left"});
  doc.fontSize(20);
  doc.text(`TERM START AND CORRESPONDENCE:`,35,450,{width:500,align:"center"});
  doc.fontSize(18);
  doc.text(`The term is set to commence on September 1st, and we kindly request that you confirm your acceptance by sending your owl no later than July 31st. Your owl should carry your acknowledgment, along with any inquiries or special requests you may have.`,35,480,{width:500,align:"left"});
  doc.text(`Yours sincerely,
  Minerva McGonagall
  Deputy Headmistress
  `,25,700,{width:500,align:"right"});
  doc.image("./assets/paperbg.jpg",0,0,{width:doc.page.width,height:doc.page.height});
  doc.text(`HOGWARTS SCHOOL of WITCHCRAFT and WIZARDRY`,25,50,{width:500,align:"center"});
  doc.text(`
  UNIFORM

  First-year students will require:

  1. Three sets of plain work robes (black)
  2. One plain pointed hat (black) for day wear
  3. One pair of protective gloves (dragon hide or similar)
  4. One winter cloak (black, silver fastenings)
  
  COURSE BOOKS

  All students should have a copy of each of the following:

  1. The Standard Book of Spells (Grade 1) by Miranda Goshawk
  2. A History of Magic by Bathilda Bagshot
  3. Magical Theory by Adalbert Waffling
  4. A Beginner's Guide to Transfiguration by Emeric Switch
  5. One Thousand Magical Herbs and Fungi by Phyllida Spore
  6. Magical Drafts and Potions by Arsenius Jigger
  7. Fantastic Beasts and Where to Find Them by Newt Scamander
  8. The Dark Forces: A Guide to Self-Protection by Quentin Trimble
  
  OTHER EQUIPMENT

  1 wand
  1 cauldron (pewter, standard size 2)
  1 set of glass or crystal phials
  1 telescope
  1 set of brass scales
  
  Students may also bring an owl OR a cat OR a toad.
  `,25,100,{width:500,align:"left"});








  




























































































  //# # # DO NOT DISTURB BELOW # # #

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
  doc.pipe(res);
  doc.end();
});

app.listen(8080, () => {
  console.log('Server Connected & Running Successfully');
});



