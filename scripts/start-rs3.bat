@echo on
cd /d %~dp0
echo Starting MongoDB Secondary node 2 (rs3)...
mongod --dbpath "../mongo-replica/rs3" --port 27102 --replSet rs0 --bind_ip localhost