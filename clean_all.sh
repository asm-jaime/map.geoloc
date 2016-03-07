#stop containers
docker stop $(docker ps -a -q)
#remove containers
docker rm $(docker ps -a -q)
#remove images
docker rmi $(docker images -q)
