var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.write('Docker image built and pushed to public repository under rkpaleru/hellowworldwithcmd');
  res.write('Kubernetes running as a cluster inside minikube. Deployed the public Docker inside minicube. Deployed pods inside cluster, and services endpoints exposed as micro-services');
  res.end();
}).listen(8000);