@echo off
cd /d "%~dp0"
echo Avvio del server di sviluppo ISAM Barber...
echo ----------------------------------------
echo NON CHIUDERE QUESTA FINESTRA MENTRE USI IL SITO!
echo Se la chiudi, il sito smettera' di funzionare.
echo ----------------------------------------
npm run dev
pause
