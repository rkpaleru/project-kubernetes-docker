# project-kubernetes-docker

Source Code Instructions and Execution (Details Below)
- Container Orchestration using Kubernetes (minikube) 
- Containerization using Docker

Containerization using Docker
=============================
1. Got Homebrew and Git installed / upgraded on my Mac
 2. Installed Docker and Node.js 
- Start Docker from Spotlight by double clicking “Docker”  Application (will run in background and can be controlled at the top right)
- 

 3. Built and pushed multiple images into Docker Hub  including one that spits out belated “Halloween” wishes :) and a light weight “Http Server” written in JS and running inside Node. 
- Go to directory where you have a local container project e.g., “cd /HelloWorld”
- Entries in the Dockerfile YAML 
    - FROM node:12.13.0-alpine  //Builds this image from node: repository…. and 12.13.0-alpine is the light weight linux image with node installed 
    - WORKDIR /app  //sets the working directory once the docker image with linux is started 
    - ADD . /app // copies the local files into the Docket Image Worked
- Build an image from the Docker Hub 
    - “docker build -t "rkpaleru/cheers2019" .”
        - builds the image and -t gives a tag with “rkpaleru/cheers2019”
        - . means the current directory is where the Dockerfile is
- Build an image from the Docker Hub 
    - “docker build -t rkpaleru/hellowworldwithcmd .”
        - builds the image and -t gives a tag with “rkpaleru/hellowworldwithcmd”
        - . means the current directory is where the Dockerfile is
- 
- List images 
    - “docker images”
		- You see the following 
			REPOSITORY                  TAG                 IMAGE ID            CREATED             SIZE
			rkpaleru/cheers2019      latest              b71bd864035f        9 seconds ago       4.01MB

	
4. Ran the Docker images as containers before running Unix shell scripts inside the containers and finally made successful http server requests / responses on listener ports inside the containers. 

- Run this at CMD >…. “docker run -it rkpaleru/cheers2019”
    - Docker runs the image in “interactive” (-i) mode - else command line keys won’t work in the image
    - Docker runs the image with the “tag” (-t) mode so you can give the firmly tag “rkpaleru/cheers2019”
- Stop the container…..CMD > “docker stop 98ccfb4ce313”  // where 98ccfb4ce313 is the container ID from “docker ps” command. 
- Remove images “docker rmi -f rkpaleru/cheers2019:latest”  // where rim is foe move and  -f is for force and “rkpaleru/cheers2019:latest” is REPOSITORY:TAG

5. Run a image in an interactive mode….> “docker run -i -t node:12.13.0-alpine /bin/sh”  //All command line scripts should now work as you are invoking sh scripting inside the container  Play with ….> “mkdir rkpaleru” Play with ….> “ls -l” Play with ….> “rmdir rkpaleru” etc. 
6. Run a lite weight http server inside the node server….>  docker run -p 8001:8000 -i -t rkpaleru/helloworld:latest node server.js  // this -p passes local port to docker port // -i is interactive // -t is tag “rkpaleru/helloworld:latest”  // node involves “Node Server” var http = require('http'); http.createServer(function (req, res) { res.writeHead(200, {'Content-Type': 'text/plain'}); res.write('Hello World!'); res.end(); }).listen(8000);  //yaml configuration for Dockerfile.yaml FROM node:12.13.0-alpine WORKDIR /app ADD . /app  //http://localhost:8001/ Should see “Hello World”

Container Orchestration using Kubernetes (minikube) 
===================================================

1. Installed, upgraded and started “minikube” as a K8s cluster with my a single master / slave configuration of Docker image from last week - i.e., lightweight http server running inside node.   brew install minikube brew upgrade minikube  
2. Started  minikube  dashboard to monitor all deployments, pods, containers and services inside the k8s cluster (did NOT use *.yaml - went the hard way with CL scripts :))  minikube dashboard 
3. Used the image I had pushed into Docker Hub (https://hub.docker.com/r/rkpaleru/hellowworldwithcmd) to deploy my Docker image into the K8s cluster as a Pod  kubectl create deployment hellowworldwithcmd --image=rkpaleru/hellowworldwithcmd 
4. Monitored all deployments, pods and service inside k8s  kubectl get deployments  kubectl get pods  kubectl get events  kubectl config view 
5. Exposed the Pod to the wan ip using the kubectl expose command:  kubectl expose deployment hellowworldwithcmd --type=LoadBalancer --port=8000 kubectl get services 
6. Called the exposed microservice within k8s and in turn got a response from node running my http server!  minikube service hello-node

