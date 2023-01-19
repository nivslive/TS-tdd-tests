import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
var express = require('express')
var multer = require('multer')
var upload = multer({ storage: multer.memoryStorage() })  // 1
var app = express()
// file system module to perform file operations
const fs = require('fs');
app.get('/buseta', upload.single('event'), (req, res) => { // 2
// json data
var jsonData = '{"test":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
 
// parse json
var jsonObj = JSON.parse(jsonData);
console.log(jsonObj);

})

app.listen(4000, () => {
  console.log('server running')
})

@Controller('example')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':structure/:reference')
  getComponentStructure(@Param('structure') structure: string,
                        @Param('reference') reference: string): any {
    

    if(typeof structure !== 'string') throw new Error('Is not string.');
    const inputs = [
      { 
        'type': structure,
        'reference': reference,
        'placeholder': '',
        'order': '0',
      }
    ];
        // stringify JSON Object
        const jsonContent = JSON.stringify(inputs);
        console.log(jsonContent);
     
        fs.writeFile("structure.json", jsonContent, 'utf8', function (err) {
        if (err) {
                  console.log("An error occured while writing JSON Object to File.");
                  return console.log(err);
        }
        console.log("JSON file has been saved.");
        }); 
    return inputs;
  }

  @Get(':component')
  getComponent(@Param('component') component: string): Object {
    let data: Object = {};
    if(component === 'response') {
      data = {
        'id': '',
        'component': '',
        'type': '',
        'data': [],
      };
    } 
     
    // stringify JSON Object
    const jsonContent = JSON.stringify(data);
    console.log(jsonContent);
 
    fs.writeFile("components.json", jsonContent, 'utf8', function (err) {
    if (err) {
              console.log("An error occured while writing JSON Object to File.");
              return console.log(err);
    }
    console.log("JSON file has been saved.");
    });   
    return this.appService.getComponent(data);
  }
}
