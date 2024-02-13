# build 
docker build . -t ansible

# run
sudo docker run -it --name ansible -v ${PWD}:/app ansible /bin/sh -c "cd ..; sh"
docker run -it ansible
ansible --version

# play playbook (in docker)
ansible-playbook playbook.yaml -i integration