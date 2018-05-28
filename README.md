# Send-Multiple-Request

Send-Multiple-Request is a tools to send multiple request in few clicks. 

## Pre-install

Some browser may block the Cross-Domain request due to security issue. To use this system, you need to enable the Allow-Control-Allow-Origin: * , by installing this  <a href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en">extention</a>

## Getting Started

Go to this <a href="https://toolbox.lotusfa.com/multi_request/"> website</a> 


## Running the example

You can try the peogram with following example:

INPUT: 
-	SELECT "GET" Method
- 	INPUT https://en.wikipedia.org/w/api.php to text filed 
-	import the <a href="https://toolbox.lotusfa.com/multi_request/wiki_example.csv">CSV</a>.

OUTPUT:
It will send a "GET" request with the data inside csv file.
ie. https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json&formatversion=2

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

