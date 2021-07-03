# jubilant-funicular
Library allows converting CSV data to multiple similar logos based on given template files by just simply running one command from console.

How to use?
-
1. Put csv data file formatted like this one below into ```./input``` directory
   
   | name        | sku           | slug  |
   | ------------- |:-------------:| -----:|
   | Product Name 100 EUR FR     | Product-Name-100-EUR-FR | product-name-100-eur-fr |

2. Run script from console using ```npm run generate``` command

After doing it, you will get logos with country flag, price and name in ```./result``` directory

Todos
-
* [ ] customizing font for name and price
* [ ] customizing positioning of flag, price and name
* [ ] selecting output file extension
* [ ] tests

Example of generated image in present version
-
![img_1.png](img_1.png)
