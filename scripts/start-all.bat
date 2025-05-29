@echo off
cd /d %~dp0
start "" start-rs1.bat
start "" start-rs2.bat
start "" start-rs3.bat
echo All MongoDB replica set nodes started.