@echo off
cd /d %~dp0
echo Starting MongoDB Secondary node 1 (rs2)...
mongod --dbpath "../mongo-replica/rs2" --port 27101 --replSet rs0 --bind_ip localhost