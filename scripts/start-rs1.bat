@echo on
cd /d %~dp0
echo Starting MongoDB Primary node (rs1)...
mongod --dbpath "../mongo-replica/rs1" --port 27100 --replSet rs0 --bind_ip localhost