# CSB310-Alternative-Language-Project
## Report
For this alternative language project, I picked javascript. Javascript was recommended as an in-demand language alongside C++, Java, and Python. I'm already familiar with Java and Python, and I have heard that C++ can be challenging, so in the interest of time I chose Javascript. I was also interested in Javascript because of it's use in web development, which sounds interesting but I have yet to learn about. 

Out of the languages I am already familiar with, Javascript reminds me of Python the most because of its dynamically typed variables. However, unlike python it uses curly braces to define code blocks and semicolons to end statements. In Javascript, object oriented programming principles can be followed by creating objects and defining methods within them. Javascript object literals do not need to be instantiated from classes although the Cell objects in this project are because they are instantiated many times and have common behaviour. Javascript is prototype-based, and when a property of an object is accessed and cannot be found locally, the value from the object's protoype will be used. This works somewhat similarly to inheritance in Java, and so do Javascript classes, however classes are still prototype-based internally in Javascript. 

This project uses the FileReader to read the CSV files. The FileReader returns a string containing all the text in the file, and then that string is processed by line using a "for of" loop to get the Cell data. Javascript supports the standard conditional statements like "if", "if-else", "else", "break", "switch", and the ternary operator. Primitive assignment in Javascript is by value, and object assignment is by reference. Loops in javascript are again similar to Java, including "for" and "while" loops. Javascript also has "for of" and "for in" loops which iterate over iterable and enumerable objects respectively, and the "forEach" array method which runs a callback function on the array. Functions are first-class objects in Javascript and can be passed to other functions and assigned to variables. Such is the case in functions like the array method "forEach", where a parameter of a function is another function to be called. Javascript does not have a built in unit testing framework, so this project uses the Jest framework to unit test the cell and cell parser classes. I chose to use Jest because of the simple installation through the vscode extension marketplace and availability of information online about it. Javascript exception handling can be done using "try", "catch", and "throw" statements.
## Assignment questions
- What company (oem) has the highest average weight of the phone body?

Lenovo, 294.46 grams
  
- Was there any phones that were announced in one year and released in another? What are they? Give me the oem and models.

Motorola, One Hyper

Motorola, Razr 2019

Xiaomi, Redmi K30 5G

- How many phones have only one feature sensor?

419 phones

- What year had the most phones launched in any year later than 1999?

2019: 247 phones

![Output screenshot](/img/Output.PNG) 
