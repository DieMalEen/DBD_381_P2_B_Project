@echo off
cd /d %~dp0
start "" start_rs1.bat
start "" start_rs2.bat
start "" start_rs3.bat
echo All MongoDB replica set nodes started.